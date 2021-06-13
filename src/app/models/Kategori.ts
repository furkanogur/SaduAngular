export class Kategoriler{
    kategoriId:string;
    KatAdi:string;
    ustKategoriId:string;
    Aktiflik:boolean;
    UstKategoriBilgi: {
        kategoriId: string;
        KatAdi: string;
        ustKategoriId: string;
        Aktiflik: boolean;
        UstKategoriBilgi: {}
      }
}