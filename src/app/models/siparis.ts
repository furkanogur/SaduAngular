export class Siparis {

    siparisId: string
    SiparisTarihi: string
    UyeId: string
    UrunId: string
    Adres: string
    Fiyat: number
    OdemeId: string
    KargoId: string
    TedarikUyeId: string
    KargoUcreti: string
    SiparisDurumuId: string
    SiparisUye: {
        uyeId: string
        KullaniciAdi: string
        Sifre: string
        admin: true,
        Email: string
        UyeUrunId: string
        UyeFoto: string
    }
    SiparisUrun: {
        urunId: string
        Adi: string
        Aciklama: string
        Aktiflik: true,
        Fiyat: number
        UyeId: string
        UrunUyeSayisi: string
        UrunFoto: string
    }
    SiparisKargo: {
        kargoId: string
        FirmaAdi: string
        Telefon: string
    }
    SiparisOdeme: {
        odemeTuruId: string
        OdemeCesiti: string
    }
    SiparisDurum: {
        siparisDurumId: string
        SiparisDurumu1: string
    }
}