import { WeddingConfig } from "@/types";

export const defaultWeddingConfig: WeddingConfig = {
  brideName: "Эзоза",
  groomName: "Амирхан",
  weddingDate: "2026-11-11T17:00:00+05:00",
  displayDate: "11 Қараша 2026",
  subtitle:
    "Біздің ең бақытты күнімізге куә болып, қуанышымызды бірге бөлісуге шақырамыз.",
  invitationTitle: "ҮЙЛЕНУ ТОЙЫНА ШАҚЫРУ",
  parentsTitle: "ТОЙ ИЕЛЕРІ",
  parentsFamily: "Муминходжаевтар жанұясы",
  countdownTitle: "Тойдың басталуына қалды",
  mapButtonText: "Картадан ашу",
  closingTitle: "Сіздерді асыға күтеміз!",
  closingNames: "Амирхан ❤️ Эзоза",
  rsvpTitle: "Тойға келесіз бе?",
  musicUrl: "/music/shanyrak-mahabbat-karaoke.mp3",
  parents: {
    bride: { father: "", mother: "" },
    groom: { father: "", mother: "" },
  },
  invitationText: `Құрметті ағайын-туыс,
бауырлар, құда-жекжат,
достар және қадірлі қонақтар!

Сіздерді Амирхан мен Эзозаның
шаңырақ көтеру тойының
қадірлі қонағы болуға
шын жүректен шақырамыз.

Ақ дастарханымыздың сәнін келтіріп,
қуанышымызды бірге бөліссеңіздер,
біз үшін үлкен мәртебе болар еді.`,
  event: {
    date: "11 Қараша 2026",
    time: "17:00",
    venue: "“SUGDIYONA” мейрамханасы",
    address: "Жаңабазар қорғаны",
    dressCode: "",
    parking: "",
    mapLat: 42.315,
    mapLng: 69.597,
    mapQuery: '"SUGDIYONA" мейрамханасы, Жаңабазар қорғаны, Шымкент',
  },
  gift: {
    bankName: "Kaspi Bank",
    cardNumber: "4400 4300 1234 5678",
    cardHolder: "Амирхан М.",
    message:
      "Сіздердің қатысуыңыз — бізге ең үлкен сыйлық. Егер тілек жібергіңіз келсе, төмендегі деректерді пайдалана аласыз.",
  },
  family: [
    { id: "1", name: "Муминходжаевтар жанұясы", role: "Той иелері", relation: "parents" },
  ],
  faq: [
    {
      id: "1",
      question: "Той қашан басталады?",
      answer: "Той 17:00-де басталады. Қонақтарды 16:30-да күтеміз.",
    },
    {
      id: "2",
      question: "Балаларды әкелуге бола ма?",
      answer: "Иә, отбасыңызбен бірге қуана қош келдіңіздер!",
    },
    {
      id: "3",
      question: "Киім коды қандай?",
      answer: "Классикалық кешкі киім. Ерлер — костюм, әйелдер — кешкі көйлек.",
    },
    {
      id: "4",
      question: "RSVP-ді қашан жіберу керек?",
      answer: "Тойға 2 апта қалғанға дейін жауабыңызды жіберіңіз.",
    },
    {
      id: "5",
      question: "Мейрамхана қайда орналасқан?",
      answer: 'Жаңабазар қорғанында орналасқан "SUGDIYONA" мейрамханасы.',
    },
  ],
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
};
