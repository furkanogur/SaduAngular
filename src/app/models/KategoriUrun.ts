export class KategoriUrun{
    kategoriUrunId: string
    UrunId: string
    KategoriId: string
    Aktiflik: true
    urunBilgi: {
      urunId: string,
      Adi: string,
      Aciklama: string,
      Aktiflik: true,
      Fiyat: 0,
      UyeId: string,
      UrunUyeSayisi: 0,
      UrunFoto: string
    }
    kategoriBilgi: {
      kategoriId: string
      KatAdi: string
      ustKategoriId: string
      Aktiflik: true,
      UstKategoriBilgi: {}
    }
  }