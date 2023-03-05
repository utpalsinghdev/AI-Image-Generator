import React, { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../component";
const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post.id} {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase ">
      {title}
    </h2>
  );
};
function Home() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setsearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/post/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.success) {
          setAllPosts(data.posts.reverse());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    const { value } = e.target;
    setSearch(value);

    setSearchTimeout(
      setTimeout(() => {
        const filteredPosts = allPosts.filter((post) => {
          post.name.toLowerCase().includes(search.toLowerCase()) ||
            post.prompt.toLowerCase().includes(search.toLowerCase());

          setsearchResults(filteredPosts);
        }, 500);
      })
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px] ">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          A place to share your work and get feedback from the community.
        </p>
      </div>
      <div>
        {/* <FormField
          labelName={"Search Posts"}
          type={"type"}
          name="text"
          placeholder={"Search Posts"}
          value={search}
          handleChange={handleSearch}
        /> */}
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {search.length > 0 && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Results for
                <span className="text-[#222328]">{search}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {search.length ? (
                <RenderCards data={searchResults} title="No Results Found" />
              ) : (
                <RenderCards data={allPosts} title={"no post found"} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
