import React, { useState, useEffect } from "react";
import DiaryPage from "../DiaryPage/DiaryPage";
import "./Profile.css";
import Preloader from "../Preloader/Preloader";

function Profile({ diaryEntries = [], error, onDelete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleEntries, setVisibleEntries] = useState(3);

  const entries = Array.isArray(diaryEntries) ? diaryEntries : [];

  useEffect(() => {
    setIsLoading(false);
  }, [diaryEntries, error]);

  const handleShowMore = () => setVisibleEntries((prev) => prev + 3);

  const isShowMoreVisible = entries.length > visibleEntries;

  if (isLoading) return <Preloader />;

  return (
    <section className="profile">
      <section className="profile__diaries">
        <p className="profile__diaries-text">
          You want to write something to Me???
        </p>

        {error ? (
          <p className="profile__diaries-error">
            Sorry, something went wrong during the request. There may be a
            connection issue or the server may be down. Please try again later.
          </p>
        ) : entries.length > 0 ? (
          <>
            <ul className="profile__diaries-list">
              {entries.slice(0, visibleEntries).map((entry) => (
                <DiaryPage key={entry._id} item={entry} onDelete={onDelete} />
              ))}
            </ul>
            {isShowMoreVisible && (
              <button className="profile__show-more" onClick={handleShowMore}>
                Show More
              </button>
            )}
          </>
        ) : (
          <p className="profile__diaries-empty">Nothing found</p>
        )}
      </section>
    </section>
  );
}

export default Profile;
