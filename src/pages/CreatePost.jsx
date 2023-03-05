import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../component";
import { toast } from "react-toast";
function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setgeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name && form.prompt && form.photo) {
      try {
        setLoading(true);
        const res = await fetch(`${API}/post/add-image`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await res.json();
        if (data.success) {
          toast.success("Post created successfully");
        } else {
          toast.error(data.message);
        }
        navigate("/");
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generatingImage = async () => {
    if (form.prompt) {
      try {
        setgeneratingImg(true);
        const res = await fetch(
          `${API}/ai/generate-image`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        const data = await res.json();
        if (data.success) {
          toast.success("Post created successfully");
        } else {
          toast.error(data.message);
        }

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.image}` });
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setgeneratingImg(false);
        toast.success("Image generated successfully");
      }
    } else {
      toast.error("Please enter prompt");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px] ">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create imaginative and visual stunning images through this Ai and
          share with the community.
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 opacity-40 object-contain"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generatingImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate Image"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[16px] ">
            Once you have created image you want, to share with others in the
            community
          </p>
          <button
            type="submit"
            className="disabled:opacity-50 disabled:cursor-not-allowed mt-5 text-white bg-blue-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing... " : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
