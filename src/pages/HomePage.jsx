import ClientList from "../components/ClientList"
import Filter from "../components/Filter"
import Header from "../components/Header"
import HomeAddForm from "../components/HomeAddForm"
import PageCard from "../components/PageCard"

function HomePage() {
  return (
    <PageCard>
      <Header title={'Block Car'}/>
      <HomeAddForm/>
      <Filter/>
      <ClientList/>
    </PageCard>
  )
}

export default HomePage
