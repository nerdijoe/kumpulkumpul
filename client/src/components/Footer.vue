<template>
  <div class="footer">
    <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Platform</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Community</a></li>
        <li><a href="#">Jobs</a></li>
        <li><a href="#">Terms</a></li>
        <li><a href="#">Privacy</a></li>
    </ul>

    <div class="badge-container vertical-container">
      <ul class="flex-container-badge">
        <li class="ui small image">
          <a href="#"><img src="../assets/app_store_badges/app-store-badge.svg"/></a>
        </li>

        <li class="ui small image">
          <a href="#"><img src="../assets/app_store_badges/google-play-badge.png"/></a>
        </li>
      </ul>

    </div>

  </div> <!-- end of footer -->

</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
      msg: 'Meetup Yuk'
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.footer {
  margin-top: 50px;
  padding-top: 20px;
  height: 100px;
  border-top: 1px solid #f5f5f5; }

.footer ul {
  text-align: center; }

.footer li {
  display: inline-block; }

.footer a {
  padding: 50px 20px;
  font-size: .875em;
  font-weight: bold; }

/*#app-store-badge {
  background-image: url("../assets/app_store_badges/app_store_badge.svg");
  display: block; }

#google-play-badge {
  background-image: url("../assets/app_store_badges/google-play-badge.png") no-repeat;
  display: block;
  width: auto;
  height: 100px;
  transform: scale(0.5, 0.5);
  -ms-transform: scale(0.5, 0.5);
  -webkit-transform: scale(0.5, 0.5); }*/

.badge-container {
  margin: auto; }

.app-store-badge {
  width: 100%;
  height: auto; }

.google-play-badge {
  padding-top: 3px;
  width: 80%;
  height: auto; }

.badge-container a {
  padding: 0px; }


</style>
