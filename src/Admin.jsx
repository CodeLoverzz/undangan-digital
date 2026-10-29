import { useState } from "react";
import { wedding as defaultWedding } from "./data/wedding.js";
import { loadWedding, resetWedding, saveWedding } from "./data/weddingStore.js";

function Field({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <input
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function Admin() {
  const [data, setData] = useState(() => structuredClone(loadWedding()));
  const [saved, setSaved] = useState(false);

  function update(path, value) {
    setSaved(false);
    setData((current) => {
      const next = structuredClone(current);
      let target = next;
      for (const key of path.slice(0, -1)) target = target[key];
      target[path.at(-1)] = value;
      if (path[0] === "date") {
        const date = new Date(value);
        if (!Number.isNaN(date.getTime())) {
          next.dateLabel = new Intl.DateTimeFormat("id-ID", {
            weekday: "long", day: "numeric", month: "long", year: "numeric",
          }).format(date);
          next.events.forEach((event) => { event.dateLabel = next.dateLabel; });
        }
      }
      return next;
    });
  }

  function handleSave() {
    try {
      saveWedding(data);
      setSaved(true);
    } catch {
      setSaved(false);
      window.alert("Data belum tersimpan. Coba gunakan foto yang lebih kecil atau kurangi isian.");
    }
  }

  function handleReset() {
    resetWedding();
    setData(structuredClone(defaultWedding));
    setSaved(false);
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="eyebrow">Pengaturan undangan</p>
          <h1>Edit data undangan</h1>
          <p>Isi bagian yang ingin diubah. Perubahan baru dipakai halaman undangan setelah disimpan.</p>
        </div>
        <a className="button button--outline" href="./">Lihat undangan</a>
      </header>

      <div className="admin-layout">
        <form className="admin-form" onSubmit={(event) => { event.preventDefault(); handleSave(); }}>
          <section className="admin-card">
            <h2>Pasangan &amp; tanggal</h2>
            <Field label="Nama yang tampil di sampul" value={data.coupleNames} onChange={(v) => update(["coupleNames"], v)} placeholder="Contoh: Aulia & Bima" />
            <Field label="Tanggal pernikahan" type="date" value={data.date?.slice(0, 10)} onChange={(v) => update(["date"], `${v}T00:00:00+07:00`)} />
            {data.profiles.map((profile, index) => <div className="admin-subsection" key={profile.role}>
              <h3>{index === 0 ? "Mempelai wanita" : "Mempelai pria"}</h3>
              <Field label="Nama lengkap" value={profile.name} onChange={(v) => update(["profiles", index, "name"], v)} />
              <Field label="Nama panggilan" value={profile.nickname} onChange={(v) => update(["profiles", index, "nickname"], v)} />
              <Field label="Keterangan orang tua" value={profile.parents} onChange={(v) => update(["profiles", index, "parents"], v)} />
              <Field label="Kota" value={profile.city} onChange={(v) => update(["profiles", index, "city"], v)} />
            </div>)}
          </section>

          <section className="admin-card">
            <h2>Acara &amp; lokasi</h2>
            {data.events.map((event, index) => <div className="admin-subsection" key={event.label}>
              <h3>{event.title}</h3>
              <Field label="Judul acara" value={event.title} onChange={(v) => update(["events", index, "title"], v)} />
              <Field label="Waktu" value={event.time} onChange={(v) => update(["events", index, "time"], v)} placeholder="Contoh: Pukul 09.00 WIB" />
            </div>)}
            <Field label="Nama lokasi" value={data.location.title} onChange={(v) => update(["location", "title"], v)} />
            <Field label="Tautan Google Maps" value={data.location.mapUrl} onChange={(v) => update(["location", "mapUrl"], v)} placeholder="https://maps.google.com/..." />
          </section>

          <section className="admin-card">
            <h2>Foto &amp; hadiah</h2>
            <p className="admin-help">Gunakan alamat gambar online atau nama file yang sudah ada di folder public/assets.</p>
            <Field label="Foto sampul" value={data.cover.src} onChange={(v) => update(["cover", "src"], v)} />
            <Field label="Foto cerita" value={data.storyPhoto.src} onChange={(v) => update(["storyPhoto", "src"], v)} />
            <Field label="Bank" value={data.gift.bank} onChange={(v) => update(["gift", "bank"], v)} />
            <Field label="Nomor rekening" value={data.gift.accountNumber} onChange={(v) => update(["gift", "accountNumber"], v)} />
            <Field label="Nama pemilik rekening" value={data.gift.accountName} onChange={(v) => update(["gift", "accountName"], v)} />
          </section>

          <div className="admin-actions">
            <button className="button button--primary" type="submit">Simpan perubahan</button>
            <button className="button button--outline" type="button" onClick={handleReset}>Kembalikan data awal</button>
            {saved && <span role="status">Tersimpan di browser ini.</span>}
          </div>
        </form>

        <aside className="admin-preview">
          <p className="eyebrow">Pratinjau nama</p>
          <h2>{data.coupleNames || "Nama pasangan"}</h2>
          <p>{data.dateLabel}</p>
          <img src={data.cover.src} alt="Pratinjau sampul undangan" />
          <p className="admin-help">Simpan perubahan, lalu tekan “Lihat undangan” untuk membuka halaman tamu.</p>
        </aside>
      </div>
    </main>
  );
}

export default Admin;
