import DetailItem from "./../../PageListItems/DetailItem";


function DetailList({ details }) {

  return (
    <div>
      <ul>
        {details.details && details.details.length > 0 ? (
          details.details.map((detail) => (
            <DetailItem key={detail.id} detailItem={detail}/>
          ))
        ) : (
          <p>No details available</p>
        )}
      </ul>
    </div>
  );
}

export default DetailList;
