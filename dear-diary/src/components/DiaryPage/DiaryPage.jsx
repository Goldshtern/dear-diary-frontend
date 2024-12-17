import "./DiaryPage.css";

function DiaryPage({ item }) {
  return (
    <li className="diary-page">
      <div>
        <h2 className="diary-page__name">{item.name}</h2>
        <p className="diary-page__text">{item.text}</p>
      </div>
    </li>
  );
}

export default DiaryPage;
