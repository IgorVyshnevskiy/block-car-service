import ClientList from "../components/PageLists/ClientList"
import Filter from "../components/Filters/Filter"
import Header from "../components/Header"
import HomeAddForm from "../components/PageForms/HomeAddForm"
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
