const asset = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`;

export const wedding = {
  coupleNames: "Farhan & Dina",
  date: "2027-04-16T00:00:00+07:00",
  dateLabel: "Jumat, 16 April 2027",
  music: asset("music.mp3"),
  cover: {
    src: asset("cover-couple.jpg"),
    alt: "Foto pasangan mempelai untuk sampul undangan.",
  },
  profiles: [
    {
      role: "The bride",
      name: "Dina Febriyanti, S.H.",
      nickname: "Dina",
      parents: "Putri dari Bapak Mahardi dan Ibu Maya",
      city: "Medan",
      src: asset("bride-portrait.jpg"),
      alt: "Potret mempelai wanita.",
    },
    {
      role: "The groom",
      name: "Farhan Rizky Wahyudi, S.Kom.",
      nickname: "Farhan",
      parents: "Putra dari Bapak Johan Wahyudi dan Ibu Syamsidar",
      city: "Asahan",
      src: asset("groom-portrait.jpg"),
      alt: "Potret mempelai pria.",
    },
  ],
  events: [
    {
      label: "Akad",
      intro: "The sacred promise",
      title: "Akad Nikah",
      dateLabel: "Jumat, 16 April 2027",
      time: "09.00 WIB",
      venue: "Lokasi akad & resepsi",
      address: "Lihat lokasi pada Google Maps.",
      mapUrl: "https://maps.app.goo.gl/2b6DRTjuXnRTeGNH7",
    },
    {
      label: "Resepsi",
      intro: "The celebration",
      title: "Resepsi",
      dateLabel: "Jumat, 16 April 2027",
      time: "10.00 WIB",
      venue: "Lokasi akad & resepsi",
      address: "Lihat lokasi pada Google Maps.",
      mapUrl: "https://maps.app.goo.gl/2b6DRTjuXnRTeGNH7",
    },
  ],
  story: [
    {
      date: "2025",
      title: "Awal sebuah cerita",
      description:
        "Pada 2025, Farhan dan Dina mulai saling mengenal. Dari perkenalan sederhana, tumbuh rasa nyaman, perhatian, dan keyakinan untuk melangkah bersama.",
    },
    {
      date: "16 April 2027",
      title: "Menuju hari bahagia",
      description:
        "Perjalanan yang dimulai dengan saling mengenal membawa Farhan dan Dina pada keputusan untuk merayakan janji suci dan membangun masa depan bersama.",
    },
  ],
  storyPhoto: {
    src: asset("story-couple.jpg"),
    alt: "Foto pasangan mempelai untuk bagian cerita.",
    ratio: "2 / 3",
  },
  gallery: [
    {
      src: asset("gallery-couple.jpg"),
      alt: "Pasangan berdiri berdampingan sambil berpegangan tangan.",
      ratio: "2.3 / 1",
      position: "center top",
    },
    {
      src: asset("gallery-couple.jpg"),
      alt: "Mempelai wanita tersenyum sambil memegang buket bunga.",
      ratio: "2.3 / 1",
      position: "center center",
    },
    {
      src: asset("gallery-couple.jpg"),
      alt: "Pasangan memotong kue pernikahan bersama.",
      ratio: "2.3 / 1",
      position: "center bottom",
    },
    {
      src: asset("wedding-detail.jpg"),
      alt: "Cincin pernikahan di atas telapak tangan pasangan.",
      ratio: "2.3 / 1",
      position: "center top",
    },
    {
      src: asset("wedding-detail.jpg"),
      alt: "Buket bunga putih yang dipegang mempelai wanita.",
      ratio: "2.3 / 1",
      position: "center 88%",
    },
  ],
  gift: {
    bank: "BNI",
    accountNumber: "395275493",
    accountName: "Nama pemilik rekening belum diisi",
  },
};
