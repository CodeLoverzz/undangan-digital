import { useEffect, useRef, useState } from "react";
import { wedding } from "./data/wedding.js";

function Photo({ image, className = "", loading = "lazy", ...props }) {
  return (
    <img
      className={className}
      src={image.src}
      alt={image.alt}
      loading={loading}
      style={{
        aspectRatio: image.ratio,
        objectPosition: image.position,
      }}
      {...props}
    />
  );
}

function Eyebrow({ children }) {
  return <p className="eyebrow">{children}</p>;
}

function SectionTitle({ label, children }) {
  return (
    <header className="section-title">
      {label && <Eyebrow>{label}</Eyebrow>}
      <h2>{children}</h2>
    </header>
  );
}

function Icon({ name }) {
  const paths = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    music: (
      <>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </>
    ),
    pause: (
      <>
        <path d="M8 5v14" />
        <path d="M16 5v14" />
      </>
    ),
    play: <path d="m8 5 12 7-12 7z" />,
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

function formatCountdown(targetDate, now) {
  if (!targetDate) {
    return { days: "--", hours: "--", minutes: "--", seconds: "--" };
  }

  const distance = Math.max(0, new Date(targetDate).getTime() - now);
  const days = Math.floor(distance / 86_400_000);
  const hours = Math.floor((distance % 86_400_000) / 3_600_000);
  const minutes = Math.floor((distance % 3_600_000) / 60_000);
  const seconds = Math.floor((distance % 60_000) / 1_000);

  return {
    days: String(days),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

function App() {
  const audioRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState("");
  const [now, setNow] = useState(Date.now());
  const [rsvpResult, setRsvpResult] = useState(null);
  const [messages, setMessages] = useState([]);
  const [copyMessage, setCopyMessage] = useState("");
  const guestName =
    new URLSearchParams(window.location.search).get("to")?.trim() ||
    "Dona/Partner";
  const countdown = formatCountdown(wedding.date, now);

  useEffect(() => {
    if (!wedding.date) return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll("[data-reveal]");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!("IntersectionObserver" in window) || reduceMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  useEffect(() => {
    startMusic();
  }, []);

  async function startMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setMusicPlaying(true);
      setMusicError("");
    } catch (error) {
      setMusicPlaying(false);
      setMusicError(
        error.name === "NotAllowedError"
          ? "Browser memblokir putar otomatis. Tekan Buka Undangan atau Putar Musik."
          : "Musik tidak dapat diputar. Periksa file audio dan coba lagi.",
      );
      if (error.name !== "NotAllowedError") {
        console.error("Gagal memutar musik undangan.", error);
      }
    }
  }

  function openInvitation() {
    setOpened(true);
    startMusic();
    window.setTimeout(() => {
      document.getElementById("opening")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setMusicPlaying(false);
      setMusicError("");
      return;
    }

    await startMusic();
  }

  async function copyAccount() {
    try {
      await navigator.clipboard.writeText(wedding.gift.accountNumber);
      setCopyMessage("Nomor rekening berhasil disalin.");
    } catch (error) {
      setCopyMessage("Tidak dapat menyalin otomatis. Silakan salin nomor rekening.");
      console.error("Gagal menyalin nomor rekening.", error);
    }
  }

  function submitRsvp(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setRsvpResult({
      name: formData.get("name"),
      attendance: formData.get("attendance"),
      guests: formData.get("guests"),
    });
    event.currentTarget.reset();
  }

  function submitMessage(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setMessages((currentMessages) => [
      {
        id: `${Date.now()}-${formData.get("name")}`,
        name: formData.get("name"),
        text: formData.get("message"),
      },
      ...currentMessages,
    ]);
    event.currentTarget.reset();
  }

  return (
    <>
      <audio
        ref={audioRef}
        autoPlay
        loop
        preload="metadata"
        onPause={() => setMusicPlaying(false)}
        onPlay={() => setMusicPlaying(true)}
        onError={() => {
          setMusicPlaying(false);
          setMusicError("File musik tidak dapat dibaca. Periksa format dan lokasi file audio.");
        }}
        onCanPlay={() => setMusicError("")}
      >
        <source src={wedding.music} type="audio/mpeg" />
      </audio>

      <main className="invitation">
        <section className="cover" aria-labelledby="couple-name">
          <Photo image={wedding.cover} className="cover__photo" loading="eager" />
          <div className="cover__content">
            <p className="cover__eyebrow">Undangan pernikahan</p>
            <h1 id="couple-name">{wedding.coupleNames}</h1>
            <p className="cover__date">{wedding.dateLabel}</p>
            <div className="cover__guest">
              <span>Kepada Yth.</span>
              <strong>{guestName || "Bapak/Ibu/Saudara/i"}</strong>
            </div>
            <button className="button button--cover" onClick={openInvitation}>
              <span aria-hidden="true">⌂</span>
              {opened ? "Undangan telah dibuka" : "Buka Undangan"}
            </button>
          </div>
          <span className="cover__scroll" aria-hidden="true">
            Gulir untuk melihat undangan
          </span>
        </section>

        <section className="section opening" id="opening" data-reveal="section">
          <Eyebrow>Assalamu’alaikum warahmatullahi wabarakatuh</Eyebrow>
          <p className="opening__copy">
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
            menyelenggarakan pernikahan putra-putri kami.
          </p>
          <p className="opening__arabic" lang="ar" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="opening__quote">
            “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa
            tenteram di sampingnya.”
          </p>
          <p className="opening__reference">QS. Ar-Rum: 21</p>
        </section>

        <section className="section couple" id="profil" data-reveal="section">
          <SectionTitle label="Dengan penuh rasa syukur">
            Dua hati, satu tujuan.
          </SectionTitle>
          <div className="couple__cards">
            {wedding.profiles.map((profile) => (
              <article
                className="profile-card"
                data-reveal="item"
                key={profile.name}
              >
                <Photo image={profile} className="profile-card__photo" />
                <Eyebrow>{profile.role}</Eyebrow>
                <h3>{profile.name}</h3>
                <p className="profile-card__nickname">({profile.nickname})</p>
                <p className="profile-card__parents">{profile.parents}</p>
                <p className="profile-card__city">{profile.city}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="countdown"
          aria-labelledby="countdown-title"
          data-reveal="section"
        >
          <Eyebrow>Menuju hari bahagia</Eyebrow>
          <h2 id="countdown-title">Waktu menuju selamanya.</h2>
          <div className="countdown__grid">
            {[
              ["days", "Hari"],
              ["hours", "Jam"],
              ["minutes", "Menit"],
              ["seconds", "Detik"],
            ].map(([key, label]) => (
              <div className="countdown__unit" key={key}>
                <span>{countdown[key]}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="section events" id="acara" data-reveal="section">
          <SectionTitle>
            Hari yang kami nantikan
          </SectionTitle>
          <div className="events__grid">
            {wedding.events.map((event) => (
              <article
                className="event-card"
                data-reveal="item"
                key={event.title}
              >
                <Eyebrow>{event.label}</Eyebrow>
                <p className="event-card__intro">{event.intro}</p>
                <h3>{event.title}</h3>
                <p className="event-card__date">{event.dateLabel}</p>
                <p className="event-card__time">{event.time}</p>
                <span className="event-card__divider" aria-hidden="true" />
                <h4>{event.venue}</h4>
                <p className="event-card__address">{event.address}</p>
                {event.mapUrl ? (
                  <a
                    className="button button--outline"
                    href={event.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="pin" />
                    Buka Google Maps
                  </a>
                ) : (
                  <button className="button button--outline" disabled>
                    <Icon name="pin" />
                    Tautan peta belum diisi
                  </button>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section story" id="cerita" data-reveal="section">
          <SectionTitle label="Kisah kami">Perjalanan menuju hari ini.</SectionTitle>
          <div className="story__layout">
            <div className="story__timeline">
              {wedding.story.map((entry) => (
                <article
                  className="timeline-entry"
                  data-reveal="item"
                  key={entry.title}
                >
                  <span className="timeline-entry__dot" aria-hidden="true" />
                  <Eyebrow>{entry.date}</Eyebrow>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                </article>
              ))}
            </div>
            <Photo image={wedding.storyPhoto} className="story__photo" />
          </div>
        </section>

        <section className="section gallery" id="galeri" data-reveal="section">
          <SectionTitle label="Dalam bingkai, dalam hati">Galeri</SectionTitle>
          <div className="gallery-grid">
            {wedding.gallery.map((image) => (
              <Photo
                image={image}
                className={`gallery-grid__photo ${image.className || ""}`}
                data-reveal="item"
                key={`${image.src}-${image.alt}`}
              />
            ))}
          </div>
          <p className="gallery__caption">Di antara banyak cerita, ini milik kami.</p>
        </section>

        <section className="section gift" id="hadiah" data-reveal="section">
          <SectionTitle label="Tanda kasih">Wedding Gift</SectionTitle>
          <p className="section__intro">
            Doa restu Anda merupakan hadiah terindah bagi kami. Namun, jika
            berkenan berbagi tanda kasih, dapat disampaikan melalui informasi
            berikut.
          </p>
          <div className="gift-card">
            <span className="gift-card__bank">{wedding.gift.bank}</span>
            <span className="gift-card__account">
              {wedding.gift.accountNumber || "Nomor rekening belum diisi"}
            </span>
            <span className="gift-card__owner">{wedding.gift.accountName}</span>
            <button
              className="button button--outline"
              onClick={copyAccount}
              disabled={!wedding.gift.accountNumber}
            >
              Salin nomor rekening
            </button>
            <p className="form-feedback" aria-live="polite">
              {copyMessage}
            </p>
          </div>
          <p className="gift__thanks">Terima kasih atas doa dan kasih sayang.</p>
        </section>

        <section className="section rsvp" id="rsvp" data-reveal="section">
          <SectionTitle label="Konfirmasi kehadiran">Will you be there?</SectionTitle>
          <p className="section__intro">
            Kehadiran dan doa Anda akan menjadi kebahagiaan bagi kami.
          </p>
          {rsvpResult ? (
            <div className="success-card" role="status">
              <span className="success-card__mark" aria-hidden="true">
                ✓
              </span>
              <h3>Terima kasih, {rsvpResult.name}.</h3>
              <p>
                Konfirmasi Anda: {rsvpResult.attendance}
                {rsvpResult.attendance === "Hadir" &&
                  `, ${rsvpResult.guests} orang`}
                . Formulir ini masih berupa pratinjau dan belum menyimpan data
                ke server.
              </p>
              <button
                className="button button--outline"
                onClick={() => setRsvpResult(null)}
              >
                Ubah jawaban
              </button>
            </div>
          ) : (
            <form className="form-card" onSubmit={submitRsvp}>
              <label>
                Nama
                <input
                  autoComplete="name"
                  name="name"
                  placeholder="Nama lengkap Anda"
                  required
                />
              </label>
              <label>
                Konfirmasi kehadiran
                <select name="attendance" defaultValue="" required>
                  <option value="" disabled>
                    Pilih kehadiran
                  </option>
                  <option>Hadir</option>
                  <option>Belum dapat hadir</option>
                </select>
              </label>
              <label>
                Jumlah tamu
                <select name="guests" defaultValue="1">
                  <option value="1">1 orang</option>
                  <option value="2">2 orang</option>
                  <option value="3">3 orang</option>
                  <option value="4">4 orang</option>
                </select>
              </label>
              <button className="button button--primary" type="submit">
                <Icon name="arrow" />
                Kirim konfirmasi
              </button>
              <p className="form-note">
                Jawaban ini hanya ditampilkan di pratinjau, belum disimpan.
              </p>
            </form>
          )}
        </section>

        <section className="section guestbook" id="ucapan" data-reveal="section">
          <SectionTitle label="Berbagi kebahagiaan">Doa &amp; harapan</SectionTitle>
          <form className="form-card" onSubmit={submitMessage}>
            <label>
              Nama
              <input
                autoComplete="name"
                name="name"
                placeholder="Nama lengkap Anda"
                required
              />
            </label>
            <label>
              Ucapan &amp; doa
              <textarea
                name="message"
                placeholder="Tuliskan doa dan ucapan untuk kedua mempelai"
                rows="4"
                required
              />
            </label>
            <button className="button button--primary" type="submit">
              <Icon name="send" />
              Kirim ucapan
            </button>
            <p className="form-note">
              Ucapan hanya tersimpan sementara di halaman pratinjau.
            </p>
          </form>
          <div className="guestbook__messages" aria-live="polite">
            {messages.map((message) => (
              <article className="guest-message" key={message.id}>
                <h3>{message.name}</h3>
                <p>{message.text}</p>
                <span>Baru saja</span>
              </article>
            ))}
          </div>
        </section>

        <section
          className="closing"
          aria-labelledby="closing-title"
          data-reveal="section"
        >
          <Photo
            image={wedding.cover}
            className="closing__photo"
            loading="lazy"
          />
          <div className="closing__content">
            <Eyebrow>Terima kasih</Eyebrow>
            <h2 id="closing-title">{wedding.coupleNames}</h2>
            <p>Merupakan suatu kehormatan dan kebahagiaan bagi kami.</p>
            <button className="button button--cover" onClick={openInvitation}>
              Kembali ke undangan
            </button>
          </div>
        </section>
      </main>

      <div className="music-control">
        <button
          className="music-control__button"
          onClick={toggleMusic}
          aria-label={musicPlaying ? "Jeda musik" : "Putar musik"}
          title={musicPlaying ? "Jeda musik" : "Putar musik"}
        >
          <Icon name={musicPlaying ? "pause" : "music"} />
          <span>{musicPlaying ? "Musik aktif" : "Putar musik"}</span>
        </button>
        {musicError && (
          <span className="music-control__error" role="status">
            {musicError}
          </span>
        )}
      </div>
    </>
  );
}

export default App;
