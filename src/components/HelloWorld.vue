<template>
<v-app>
  <v-card flat>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          WELCOME TO AGRI-FAMILY
        </h1>

        <p class="subheading font-weight-regular">
          we have collected all agriculture products and services in one place for easy getting informations.
          <br>please contact us online
        </p>
      </v-col>     
    </v-row>
  </v-card>
  <div class="slideshow-container">

    <div class="mySlides">
      <div class="row">
        <div class="card" v-for="item in allPosts.slice(0,5)" :key="item._id">
          <img :src="item.firstimage" class="image">
          <h1 class="author">{{item.title}}</h1>
          <p class="price">{{item.price}} {{item.currency}}</p>
          <p><button>VIEW</button></p>
        </div>
      </div>
    </div>
    <div class="mySlides">
      <div class="row">
        <div class="card" v-for="item in allPosts.slice(5,10)" :key="item._id">
          <img :src="item.firstimage">
          <p class="author">{{item.title}}</p>
          <p class="price">{{item.price}} {{item.currency}}</p>
          <p><button>VIEW</button></p>
        </div>
      </div>
    </div>
    <div class="mySlides">
      <div class="row">
        <div class="card" v-for="item in allPosts.slice(10,16)" :key="item._id">
          <img :src="item.firstimage">
          <h1 class="author">{{item.title}}</h1>
          <p class="price">{{item.price}} {{item.currency}}</p>
          <p><button>VIEW</button></p>
        </div>
      </div>
    </div>      

    <a class="prev" @click="plusSlides(-1)">❮</a>
    <a class="next" @click="plusSlides(1)">❯</a>

    </div>

    <div class="dot-container">
      <span class="dot" @click="currentSlide(1)"></span> 
      <span class="dot" @click="currentSlide(2)"></span> 
      <span class="dot" @click="currentSlide(3)"></span> 
    </div>
    <div v-for="itm in getHotPosts" :key="itm._id" class="htcategory">
      <div class="titlecategory">
        <h4>{{itm.title}}</h4>
      </div>
      <div class="row">
        <div v-for="p in itm.posts" :key="p._id" class="card bodycategory">
          <img :src="p.firstimage" class="image">
          <h1 class="author">{{p.title}}</h1>
          <p class="price">{{p.price}} {{p.currency}}</p>
          <p><button>VIEW</button></p>
        </div>
      </div>
    </div>
  
</v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data: () => ({
      slideIndex: 1     
    }),
    created(){
      this.fetchHotPost();
      this.fetchHotPostCategory();
    },
    computed: {
    ...mapGetters([
      "allPosts",
      "getHotPosts"
    ])
    },
    mounted(){
      this.$nextTick(this.showSlides(this.slideIndex))
    },
    methods:{
      ...mapActions(["fetchHotPost","fetchPostImage","fetchHotPostCategory"]),
     showSlides(n){
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {this.slideIndex = 1}    
        if (n < 1) {this.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideIndex-1].style.display = "block";  
        dots[this.slideIndex-1].className += " active";
     },
     plusSlides(n){
       this.showSlides(this.slideIndex += n);
     },
     currentSlide(n){
       this.showSlides(this.slideIndex = n);
     }
    }
  }
</script>
<style scoped>
  .slideshow-container{
    position: relative;
    background:  #f2f2f2;
    height: 25%;
  }
  .mySlides{
    display: none;
    padding: 5px;
    text-align: center;
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
  .prev, .next {
    cursor: pointer;
    position: absolute;
    top: 40%;
    width: auto;
    margin-top: -30px;
    padding: 16px;
    color: #888;
    font-weight: bold;
    font-size: 20px;
    border-radius: 0 3px 3px 0;
    user-select: none;
  }
  /* Position the "next button" to the right */
  .next {
    position: absolute;
    right: 0;
    border-radius: 3px 0 0 3px;
  }

  /* On hover, add a black background color with a little bit see-through */
  .prev:hover, .next:hover {
    background-color: rgba(0,0,0,0.8);
    color: white;
  }

  /* The dot/bullet/indicator container */
  .dot-container {
      text-align: center;
      padding: 20px;
      background: #ddd;
  }

  /* The dots/bullets/indicators */
  .dot {
    cursor: pointer;
    height: 15px;
    width: 15px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
  }

  /* Add a background color to the active dot/circle */
  .active, .dot:hover {
    background-color: #717171;
  }

  /* Add an italic font style to all quotes */
  q {font-style: italic;}

  /* Add a blue color to the author */
  .author {color: cornflowerblue;}

  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 250px;
    height: 500px;
    margin: auto;
    text-align: center;
    font-family: arial;
  }

  .card button {
    border: none;
    outline: 0;
    padding: 12px;
    color: white;
    background-color: #000;
    text-align: center;
    cursor: pointer;
    width: 100%;
    font-size: 18px;
  }

  .price {
    color: grey;
    font-size: 22px;
  }

  .card button:hover {
    opacity: 0.7;
  }

  .image {
    height: 200px;
  }

  .htcategory {
    background-color: #f2f2f2;
    height: 600px;
  }

  .titlecategory{
    background-color: darkslateblue;
    height: 50px;
    color: whitesmoke;
    padding-top: 15px;
    font-weight: bold;
    font-size: 1rem;
    padding-left: 30px;
  }

  .bodycategory{
    background-color: white;
    height: 500px;
    border: 1px solid;
    border-color: lightgoldenrodyellow;
    padding: 10px;
  }
</style>