<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by Judul Berita"
          v-model="judul_berita"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchJudulBerita"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>News List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(news, index) in newsList"
          :key="index"
          @click="setActiveNews(news, index)"
        >
          {{ news.judul_berita }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllNews">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentNews">
        <h4>News</h4>
        <div>
          <label><strong>Judul Berita:</strong></label> {{ currentNews.judul_berita }}
        </div>
        <div>
          <label><strong>Kategori:</strong></label> {{ currentNews.kateogri }}
        </div>
        <div>
          <label><strong>Isi:</strong></label> {{ currentNews.isi }}
        </div>
        <div>
          <label><strong>Publish Date:</strong></label> {{ currentNews.publish_date }}
        </div>

        <a class="badge badge-warning"
          :href="'/news/' + currentNews.id_berita"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a News...</p>
      </div>
    </div>
  </div>
</template>

<script>
import NewsDataService from "../services/NewsDataService";

export default {
  name: "news-list",
  data() {
    return {
      newsList: [],
      currentNews: null,
      currentIndex: -1,
      judul_berita: ""
    };
  },
  methods: {
    retrieveNewsList() {
      NewsDataService.getAll()
        .then(response => {
          this.newsList = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveNewsList();
      this.currentNews = null;
      this.currentIndex = -1;
    },

    setActiveNews(news, index) {
      this.currentNews = news;
      this.currentIndex = index;
    },

    removeAllNews() {
      NewsDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      NewsDataService.findByTitle(this.judul_berita)
        .then(response => {
          this.newsList = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveNewsList();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>