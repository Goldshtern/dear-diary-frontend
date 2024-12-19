import React from "react";
import DiaryPage from "../DiaryPage/DiaryPage";
import "./Profile.css";

function Profile({ diaryEntries }) {
  return (
    <div className="profile">
      <section className="profile__diaries">
        <p className="profile__diaries-text">
          You want to write something to Me???
        </p>
        <ul className="profile__diaries-list">
          {diaryEntries.map((entry) => (
            <DiaryPage key={entry._id} item={entry} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Profile;
