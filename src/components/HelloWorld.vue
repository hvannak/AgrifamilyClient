<template>
<v-app>
  <v-card flat>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          {{showLanguage('Welcome_title')}}
        </h1>

        <p class="subheading font-weight-regular">
          {{showLanguage('Welcome_subtitle')}}
        </p>
      </v-col>     
    </v-row>
  </v-card>
  <div class="slideshow-container">
    <div class="mySlides">
      <div class="row">
        <div class="card" v-for="item in allPosts.slice(0,4)" :key="item._id">
          <img :src="item.firstimage" class="image">
          <h5 class="author">{{item.title}}</h5>
          <p class="price">{{item.price}} {{item.currency}}</p>
          <p><button @click="showDetails(item)">VIEW</button></p>
        </div>
      </div>
    </div>
    <div class="mySlides">
      <div class="row">
        <div class="card" v-for="item in allPosts.slice(4,8)" :key="item._id">
          <img :src="item.firstimage" class="image">
          <h5 class="author">{{item.title}}</h5>
          <p class="price">{{item.price}} {{item.currency}}</p>
          <p><button @click="showDetails(item)">VIEW</button></p>
        </div>
      </div>
    </div>
    <div class="mySlides">
      <div class="row">
        <div class="card" v-for="item in allPosts.slice(8,11)" :key="item._id">
          <img :src="item.firstimage" class="image">
          <h5 class="author">{{item.title}}</h5>
          <p class="price">{{item.price}} {{item.currency}}</p>
          <p><button @click="showDetails(item)">VIEW</button></p>
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
          <p><button @click="showDetails(p)">VIEW</button></p>
        </div>
      </div>
    </div>

    <v-row justify="space-around">
      <v-col cols="auto">
        <v-dialog
          transition="dialog-top-transition"
          max-width="800"
          v-model="dialog"
        >
        <v-card>
          <v-toolbar
            color="primary"
            dark
          >{{showLanguage('Message_title_detail')}}</v-toolbar>
          <v-carousel>
            <v-carousel-item
              v-for="(itm,i) in getPostImages"
              :key="i"
              :src="itm.image"
              reverse-transition="fade-transition"
              transition="fade-transition"
              contain
            ></v-carousel-item>
          </v-carousel>
          <v-card-text>
          <v-timeline dense>
            <v-timeline-item
              color="purple lighten-2"
              fill-dot
              right
            >
              <v-card>
                <v-card-title class="purple lighten-2">
                  <v-icon
                    dark
                    size="42"
                    class="mr-4"
                  >
                    mdi-magnify
                  </v-icon>
                  <h2 class="display-1 white--text font-weight-light">
                    {{details.title}}
                  </h2>
                </v-card-title>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="10"
                    >
                      {{details.description}}
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-timeline-item>

            <v-timeline-item
              color="amber lighten-1"
              fill-dot
              right
              small
            >
              <v-card>
                <v-card-title class="amber lighten-1 justify-end">
                  <h2 class="display-1 mr-4 white--text font-weight-light">
                    {{showLanguage('Contact')}}
                  </h2>
                  <v-icon
                    dark
                    size="42"
                  >
                    mdi-email-outline          
                  </v-icon>
                </v-card-title>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="10"
                    >                                          
                      {{details.price}} {{details.currency}}
                      <v-divider></v-divider>
                      {{details.phone}}
                      <v-divider></v-divider>
                      {{details.email}}
                    </v-col>           
                  </v-row>
                </v-container>
              </v-card>
            </v-timeline-item>

            <v-timeline-item
              color="cyan lighten-1"
              fill-dot
              right
            >
              <v-card>
                <v-card-title class="cyan lighten-1">
                  <v-icon
                    class="mr-4"
                    dark
                    size="42"
                  >
                    mdi-home-outline
                  </v-icon>
                  <h2 class="display-1 white--text font-weight-light">
                    {{showLanguage('Address')}}
                  </h2>
                </v-card-title>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="10"
                    >
                      {{details.location}}
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-timeline-item>            
          </v-timeline>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              text
              @click="dialog = false"
            >{{showLanguage('Close')}}</v-btn>
          </v-card-actions>
        </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  
</v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as apiHelper from '../store/modules/api-helper';

export default {
    data: () => ({
      slideIndex: 1,
      dialog: false,
      details: {},     
    }),
    created(){
      this.fetchHotPost();
    },
    computed: {
    ...mapGetters([
      "allPosts",
      "getHotPosts",
      "getPostImages"
    ])
    },
    mounted(){
      this.$nextTick(this.showSlides(this.slideIndex))
    },
    methods:{
      ...mapActions(["fetchHotPost","fetchPostImage"]),
      showLanguage(prop) {
        return apiHelper.getShowLang(prop);
      },
      showDetails(item){
        this.fetchPostImage(item._id);
        this.details = item;
        this.dialog = true;
      },
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
    border: 1px solid;
    border-color: lightgoldenrodyellow;
  }
  .mySlides{
    display: none;
    padding: 10px;
    text-align: center;
  }
  .row {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: inherit;
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
    max-width: 25%;
    height: 450px;
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
    /* height: 530px; */
    padding-top: 25px;
    padding-bottom: 10px;
  }

  .titlecategory{
    background-color: darkslateblue;
    height: 50px;
    color: whitesmoke;
    padding-top: 10px;
    font-weight: bold;
    font-size: 1rem;
    padding-left: 30px;
  }

  .bodycategory{
    background-color: white;
    /* height: 450px; */
    border: 1px solid;
    border-color: lightgoldenrodyellow;
  }
</style>