import ClientList from "../components/ClientList"
import Filter from "../components/Filter"
import Header from "../components/Header"
import HomeAddForm from "../components/HomeAddForm"

function HomePage() {
  return (
    <div>
      <Header title={'Block Car'}/>
      <HomeAddForm/>
      <Filter/>
      <ClientList/>
    </div>
  )
}

export default HomePage
