import { Urunler } from './Urunler';
import { Uye } from './Uye';
export class TedarikciUrunler {
    tedarikId:string;
    tedarikciIUyed:string;
    tedarikUrunId:string;
    Aktiflik:boolean;
    uyeBilgi:Uye;
    urunBilgi:Urunler;
}