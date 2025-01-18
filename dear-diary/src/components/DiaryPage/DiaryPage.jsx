import "./DiaryPage.css";

function DiaryPage({ item }) {
  return (
    <li className="diary-page">
      <div>
        <h2 className="diary-page__name">{item.title}</h2>
        <img
          className="diary-page__image"
          src={item.imageUrl}
          alt={item.title}
        />
        <p className="diary-page__text">{item.text}</p>
      </div>
    </li>
  );
}

export default DiaryPage;
