import "./DiaryPage.css";

function DiaryPage({ item }) {
  return (
    <li className="diary-page">
      <h2 className="diary-page__name">{item.title}</h2>
      <img className="diary-page__image" src={item.imageUrl} alt={item.name} />
      <p className="diary-page__text">{item.text}</p>
    </li>
  );
}

export default DiaryPage;
