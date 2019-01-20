const timelineData = [
  {
    author: {
      name: "Phong Lục",
      avatar:
        "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/34962526_1670201939745666_935045514557128704_n.jpg?_nc_cat=109&_nc_ht=scontent.fsgn2-4.fna&oh=922c5e4c7b25b9184d56d6dcf7b7436b&oe=5CB5D7B4"
    },
    image:
      "https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/49674128_1174786932716244_535039520765116416_n.jpg?_nc_cat=102&_nc_ht=scontent.fsgn5-4.fna&oh=81ab2262228dedf65d8569bbbce0efb6&oe=5CCAD6E3"
  },
  {
    author: {
      name: "Donal",
      avatar:
        "https://images-na.ssl-images-amazon.com/images/I/71zIf6eYL1L._SX425_.jpg"
    },
    image:
      "https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/49674128_1174786932716244_535039520765116416_n.jpg?_nc_cat=102&_nc_ht=scontent.fsgn5-4.fna&oh=81ab2262228dedf65d8569bbbce0efb6&oe=5CCAD6E3"
  },
  {
    author: {
      name: "Chii Mio",
      avatar:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/01/24/12/v2-cute-cat-picture.jpg?w968h681"
    },
    image:
      "https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/49674128_1174786932716244_535039520765116416_n.jpg?_nc_cat=102&_nc_ht=scontent.fsgn5-4.fna&oh=81ab2262228dedf65d8569bbbce0efb6&oe=5CCAD6E3"
  },
  {
    author: {
      name: "Hồng Phúc",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqkfbb-NaFu0bh_PmryiwCePg3iBDLZTvbSo1aNZr7rXdTob1p2w"
    },
    image:
      "https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/49674128_1174786932716244_535039520765116416_n.jpg?_nc_cat=102&_nc_ht=scontent.fsgn5-4.fna&oh=81ab2262228dedf65d8569bbbce0efb6&oe=5CCAD6E3"
  }
];

const emojiImage = [
  require("../assets/icons/like.png"),
  require("../assets/icons/love.png"),
  require("../assets/icons/haha.png"),
  require("../assets/icons/wow.png"),
  require("../assets/icons/sad.png"),
  require("../assets/icons/angry.png")
];

const profileData = {
  user: {
      name: 'Lục Trường Phong',
      avatar: "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/34962526_1670201939745666_935045514557128704_n.jpg?_nc_cat=109&_nc_ht=scontent.fsgn2-4.fna&oh=922c5e4c7b25b9184d56d6dcf7b7436b&oe=5CB5D7B4",
      cover: "https://scontent.fsgn6-1.fna.fbcdn.net/v/t1.0-9/12143114_789453024513876_299304967749706371_n.jpg?_nc_cat=106&_nc_oc=AQmDBwMwml9V4qpFpTWnEKUBzZL1TcQb3rnseLPCSLkqVKgetMd5sfQXNDc1MKBAhe0&_nc_ht=scontent.fsgn6-1.fna&oh=cf6d112c21236ff71d538669e513874d&oe=5CFF7F94",
  },
    images:[
    'https://scontent.fsgn6-2.fna.fbcdn.net/v/t1.0-9/50294491_1603715453106726_8833037394585321472_n.jpg?_nc_cat=100&_nc_oc=AQkjihCuGi-mK9Mv54WIv7X6V9EboGVUBqFMxPlP7LLwySZKhLGCW81yRU_RgsPxNss&_nc_ht=scontent.fsgn6-2.fna&oh=e6d4943f383816f4a422e54954416d43&oe=5CC6FFC4',
    'https://scontent.fsgn6-1.fna.fbcdn.net/v/t1.0-9/19399005_1322641507849968_2314043907567327162_n.jpg?_nc_cat=109&_nc_oc=AQk79e0Pe6ZaHlVTcdxflNdmMCn7QA3gGCF-YJDJ-29auMeBL3bMGA0HkXKtrhMooGE&_nc_ht=scontent.fsgn6-1.fna&oh=ae1b972a971bef588b2ad6439a6ddc5f&oe=5CFD6AB4',
    'https://scontent.fsgn6-2.fna.fbcdn.net/v/t1.0-9/50294491_1603715453106726_8833037394585321472_n.jpg?_nc_cat=100&_nc_oc=AQkjihCuGi-mK9Mv54WIv7X6V9EboGVUBqFMxPlP7LLwySZKhLGCW81yRU_RgsPxNss&_nc_ht=scontent.fsgn6-2.fna&oh=e6d4943f383816f4a422e54954416d43&oe=5CC6FFC4',
    'https://scontent.fsgn6-2.fna.fbcdn.net/v/t1.0-9/12039348_857654787667056_317452033335693623_n.jpg?_nc_cat=108&_nc_oc=AQllEma-9bY6qx-6tewFKjWnlYac6bwfJw-653aQO0DAzsRur3OVMh9jiRQcSa_q004&_nc_ht=scontent.fsgn6-2.fna&oh=7b4ad61fb8eead161e1ec593a3d3993c&oe=5CFA16AF',
    'https://scontent.fsgn6-1.fna.fbcdn.net/v/t1.0-9/12046820_857654817667053_7897230101475256482_n.jpg?_nc_cat=104&_nc_oc=AQlVuKg0HBxSbFTbfJL2VxRur2lqk5IVGSLGhM4E6T5GcgE_3XoHfcHMWfTT3_t9XjE&_nc_ht=scontent.fsgn6-1.fna&oh=c0465f52f640b58e5e7524644ba82f31&oe=5CF97B4B',
    'https://scontent.fsgn6-2.fna.fbcdn.net/v/t1.0-9/12033107_857654751000393_1414948290460880753_n.jpg?_nc_cat=102&_nc_oc=AQmfu_EYfZT16vpNQzQMaSSmGrCPRmKRmVLdglJvpHjCJlthDY_hIwufzAYOHhPGZPU&_nc_ht=scontent.fsgn6-2.fna&oh=8b5d2ec8dc8f13ee67c5fae0777200a4&oe=5D00D215'
  ],
};
export { timelineData, emojiImage , profileData};
