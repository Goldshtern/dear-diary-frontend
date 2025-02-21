import "./DiaryPage.css";
import deleteBtn from "../../assets/deleterip-button.png";

function DiaryPage({ item }) {
  return (
    <li className="diary-page">
      <h2 className="diary-page__name">{item.title}</h2>
      <img className="diary-page__image" src={item.imageUrl} alt={item.name} />
      <p className="diary-page_text">{item.text}</p>
      <button type="button" className="diary-page__delete">
        <img src={deleteBtn} alt="Delete" />
      </button>
    </li>
  );
}

export default DiaryPage;
