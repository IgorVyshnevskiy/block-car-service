import DetailItem from "./../../PageListItems/DetailItem";
import css from './../ListStyles.module.css';


function DetailList({ details, fetchClientsDetails }) {

  return (
    <div className={css.listContainer}>

      <h3 className={css.listTitle}>ДЕТАЛІ</h3>
      <ul>
        {details.details && details.details.length > 0 ? (
          details.details.map((detail) => (
            <DetailItem key={detail.id} detailItem={detail} fetchClientDetails={fetchClientsDetails}/>
          ))
        ) : (
          <p>деталі відсутні</p>
        )}
      </ul>
    </div>
  );
}

export default DetailList;
