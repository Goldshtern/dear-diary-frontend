import "./Profile.css";

function Profile() {
  return (
    <div className="profile">
      <section className="profile__diaries">
        <p className="profile__diaries-text">
          You want to write something in Me???
        </p>
        <ul className="profile__diaries-list">
          <div>Page1</div>
          <div>Page2</div>
          <div>Page3</div>
        </ul>
      </section>
    </div>
  );
}

export default Profile;
