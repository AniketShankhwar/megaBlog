import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/configuration";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addPost, updatePost } from "../../store/postsSlice";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      if (!userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          userData = currentUser;
        } else {
          alert("Session not found. Please log in again.");
          return;
        }
      }

      if (post) {
        // Gets new Uploaded Image in File variable
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }

        // FIX NEEDED HERE: Destructure and strip 'image' away from text fields
        const { image, ...restOfFormData } = data;

        // post.$id here will act like slug
        const dbPost = await appwriteService.updatePost(post.$id, {
          ...restOfFormData, // FIX NEEDED HERE: Pass the cleaned payload without raw file structures
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (dbPost) {
          dispatch(updatePost(dbPost));
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        // If the New File is being created, New Post New Form
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          const fileId = file.$id;

          // FIX NEEDED HERE: Destructure and strip 'image' away from text fields
          const { image, ...restOfFormData } = data;

          const dbPost = await appwriteService.createPost({
            ...restOfFormData, // FIX NEEDED HERE: Pass the cleaned payload without raw file structures
            featuredImage: fileId,
            userId: userData.$id,
          });

          if (dbPost) {
            dispatch(addPost(dbPost));
            navigate(`/post/${dbPost.$id}`);
          }
        } else {
          alert("Please upload a featured image.");
        }
      }
    } catch (error) {
      console.error("Form Submission Error:", error.message);
      alert(`Submission failed: ${error.message}`);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full aspect-video object-cover object-center"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
