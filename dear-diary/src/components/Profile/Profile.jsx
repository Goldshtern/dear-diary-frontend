import React, { useState, useEffect } from "react";
import DiaryPage from "../DiaryPage/DiaryPage";
import "./Profile.css";
import Preloader from "../Preloader/Preloader";

function Profile({ diaryEntries, error }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (error) {
      setHasError(true);
      setIsLoading(false);
    } else if (diaryEntries && diaryEntries.length > 0) {
      setHasData(true);
      setIsLoading(false);
    } else if (diaryEntries) {
      setHasData(false);
      setIsLoading(false);
    }
  }, [diaryEntries, error]);

  return (
    <div className="profile">
      <section className="profile__diaries">
        <p className="profile__diaries-text">
          You want to write something to Me???
        </p>
        {isLoading ? (
          <Preloader />
        ) : hasError ? (
          <p className="profile__diaries-error">
            Sorry, something went wrong during the request. There may be a
            connection issue or the server may be down. Please try again later.
          </p>
        ) : hasData ? (
          <ul className="profile__diaries-list">
            {diaryEntries.map((entry) => (
              <DiaryPage key={entry._id} item={entry} />
            ))}
          </ul>
        ) : (
          <p className="profile__diaries-empty">Nothing found</p>
        )}
      </section>
    </div>
  );
}

export default Profile;
