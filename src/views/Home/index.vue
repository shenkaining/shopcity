<template>
  <div class="home-container">
    <TypeNav></TypeNav>
  <ListContainer></ListContainer>
  <Recommend></Recommend>
  <Rank></Rank>
  <Like></Like>
  <Floor></Floor>
  <Floor></Floor>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
export default {
  name: 'Home',
  components: { ListContainer, Recommend, Rank, Like, Floor }
}
</script>

<style></style>
