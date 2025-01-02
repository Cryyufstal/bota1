
export default function Home() {
  return (
    <TabProvider>
      <main className="min-h-screen bg-black text-white">
        <CheckFootprint />
         <TabContainer />
        <NavigationBar />
      </main>
    </TabProvider>
  )
}
