import React, { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../component";
const RenderCards = ({ data, title }) => {
  if (data.length > 0) {
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
  const [allPosts, setAllPosts] = useState(null);
  const [search, setSearch] = useState("");

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
        <FormField />
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
                Showing Results for{" "}
                <span className="text-[#222328]">{search}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {search.length ? (
                <RenderCards data={[]} title="No Results Found" />
              ) : (
                <RenderCards data={[]} title={"no post found"} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
