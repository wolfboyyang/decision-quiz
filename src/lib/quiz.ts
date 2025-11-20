import type { Picture } from "vite-imagetools";

const imageModules: Record<
  string,
  {
    default: Picture;
  }
> = import.meta.glob(
  "$lib/assets/icons/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}",
  {
    eager: true,
    query: {
      enhanced: true,
    },
  },
);

export const QUIZ_DATA: {
  id: number;
  title: string;
  scenario: string;
  image: Picture;
  options: { [key: string]: string };
  feedback: { [key: string]: string };
}[] = [
  {
    id: 1,
    title: "Najdeni denar",
    image: imageModules["/src/lib/assets/icons/1.png"].default,
    scenario:
      "Na poti iz šole na tleh zagledaš bankovec za 10 €. Nikogar ni v bližini. Kaj storiš?",
    options: {
      A: "Poberem denar in ga dam v žep. Kar najdeš, je tvoje!",
      B: "Vprašam prijatelje, ki hodijo z mano, če je kdo izgubil denar.",
      C: "Poberem denar in ga odnesem v tajništvo šole (ali staršem, da ga odnesejo na policijo).",
    },
    feedback: {
      A: "Ta odločitev ti prinese takojšnjo korist, a razmisli: nekdo je ta denar izgubil in ga morda potrebuje. Odgovornost in poštenost sta vrednoti, ki sta dolgoročno pomembnejši od 10 €.",
      B: "To je zelo pošteno do prijateljev in kaže na tvojo skrb za druge. Kaj pa, če denar ni njihov? Včasih je treba denar odnesti na varno mesto, kjer ga bo lastnik lažje našel.",
      C: "Odlična odločitev! S tem si pokazal/a visoko stopnjo odgovornosti in integritete. Čeprav se morda zdi, da si se odpovedal/a denarju, si okrepil/a svoj značaj. Zanimivost: po zakonu ti po enem letu, če se lastnik ne najde, najdeni denar celo pripada.",
    },
  },
  {
    id: 2,
    title: "Pritisk vrstnikov",
    image: imageModules["/src/lib/assets/icons/2.png"].default,
    scenario:
      "Vsi tvoji prijatelji igrajo novo spletno igro, ki stane 50 €. Ti imaš prihranjenih le 20 €. Kaj narediš?",
    options: {
      A: "Prosim starše, da mi posodijo ali dajo 30 €, ker res ne želim biti edini/a, ki ne igra.",
      B: "Naredim načrt: manjkajočih 30 € bom prihranil/a od žepnine ali pa si jih prislužil/a z dodatnimi opravili.",
      C: 'Na spletu poiščem nezakonito, "piratsko" različico igre, da jo lahko igram zastonj.',
    },
    feedback: {
      A: "Razumljivo je, da želiš biti del družbe. Pogovor s starši je vedno dobra ideja. Vendar ta rešitev ne krepi tvoje samostojnosti. Morda obstaja način, da do cilja prideš z lastnim trudom? To je priložnost za učenje o načrtovanju.",
      B: "To je odličen primer odložene zadovoljitve in odgovornosti! Namesto takojšnje rešitve si izbral/a pot načrtovanja in lastnega truda. Ko boš igro kupil/a s svojim denarjem, jo boš še bolj cenil/a. Bravo!",
      C: "Čeprav se zdi to hitra rešitev, je kraja intelektualne lastnine nezakonita in nepoštena do ustvarjalcev igre. Poleg tega so takšne strani polne virusov, ki lahko poškodujejo tvoj računalnik. To je tvegana in neodgovorna odločitev.",
    },
  },
  {
    id: 3,
    title: "Varčevanje ali uporaba",
    image: imageModules["/src/lib/assets/icons/3.png"].default,
    scenario:
      "Za rojstni dan si od sorodnikov dobil/a 40 €. Tvoj dolgoročni cilj je nakup novih slušalk, ki stanejo 80 €. Prijatelji te vabijo na pijačo in v kino, kar bi te stalo 15 €. Kaj storiš?",
    options: {
      A: "Vseh 40 € takoj dodam k prihrankom za slušalke, saj bom tako bližje cilju.",
      B: "S prijatelji grem v kino in na pijačo (porabim 15 €), preostalih 25 € pa varčujem za slušalke.",
      C: "Pozabim na slušalke in si s celotnim zneskom takoj privoščim nekaj lepega – kino, pijačo in še novo majico.",
    },
    feedback: {
      A: "Zelo si discipliniran/a in osredotočen/a na svoj dolgoročni cilj! To je odlična lastnost. Pazi le, da si včasih privoščiš tudi kakšno manjšo, sprotno nagrado, da ne izgubiš motivacije.",
      B: "To je odličen primer uravnoteženega proračuna! Uspelo ti je najti ravnovesje med varčevanjem za pomemben cilj in uživanjem v sedanjem trenutku s prijatelji. Tako se gradi zdrav odnos do denarja.",
      C: "Uživanje v sedanjosti je pomembno, a ta odločitev te oddalji od tvojega dolgoročnega cilja – slušalk. Upravljanje z denarjem pomeni iskanje ravnovesja med trenutnimi željami in potrebami v prihodnosti.",
    },
  },
  {
    id: 4,
    title: "Počen zaslon",
    image: imageModules["/src/lib/assets/icons/4.png"].default,
    scenario:
      "Po nesreči ti je telefon padel na tla. Zaradi udarca je počil zaslon. Telefon še vedno deluje, a razpoka je moteča, zato si želiš novega telefona. Kaj storiš?",
    options: {
      A: "Vztrajam pri starših, da potrebujem nov telefon, ker je ta uničen in me je sram pred prijatelji.",
      B: "Uporabljam telefon s počenim zaslonom in začnem varčevati, da si ga bom nekoč lahko zamenjal/a z novim.",
      C: "Preverim, koliko stane popravilo zaslona. Denar za popravilo poskusim zaslužiti z dodatnim delom ali pa strošek popravila pokrijem iz svojih prihrankov.",
    },
    feedback: {
      A: "Razumljivo je, da te moti počen zaslon. Vendar, ali je telefon res 'uničen', če še deluje? Ta situacija je priložnost za razmislek o trajnosti in o tem, ali res potrebujemo novo stvar ali pa si je samo želimo zaradi videza.",
      B: "To kaže na potrpežljivost in sprejemanje odgovornosti za svoje stvari. Je pa res, da je uporaba telefona s počenim zaslonom lahko neprijetna in celo nevarna. Obstaja morda še tretja, bolj aktivna rešitev?",
      C: "Odlična izbira! Prevzel/a si odgovornost za popravilo in razmišljal/a o trajnosti – popraviti je bolje kot zavreči. S tem, ko boš sam/a prispeval/a denar, boš na telefon v prihodnje zagotovo pazil/a še bolj.",
    },
  },
  {
    id: 5,
    title: "Spletna skušnjava",
    image: imageModules["/src/lib/assets/icons/5.png"].default,
    scenario:
      'Igraš "brezplačno" igro na telefonu. Zataknilo se ti je na težki stopnji. Igra ti ponuja "poseben paket za 4,99 €", s katerim bi stopnjo z lahkoto prešel/la. Starši imajo v spletni trgovini shranjeno svojo kreditno kartico.',
    options: {
      A: "Potihoma opravim nakup. Saj je samo 5 €, verjetno ne bodo opazili.",
      B: "Starše vprašam za dovoljenje za nakup in jim ponudim, da mi znesek odštejejo od žepnine.",
      C: "Uprem se skušnjavi in poskusim stopnjo premagati z vztrajnostjo in spretnostjo, brez plačevanja.",
    },
    feedback: {
      A: "Čeprav se zdi znesek nizek, je uporaba tujega denarja brez dovoljenja kraja. To uniči zaupanje staršev. Digitalni denar je pravi denar in ta odločitev je zelo neodgovorna.",
      B: "To je poštena in odgovorna odločitev. Pogovor s starši je vedno prava pot. Daje jim priložnost, da se zavedajo, kam odteka denar, tebi pa, da prevzameš odgovornost za svoje želje.",
      C: "Bravo! Uprl/a si se takojšnji rešitvi in izbral/a pot vztrajnosti. To je odličen trening odložene zadovoljitve. Zmaga, ki jo dosežeš z lastnim trudom, je veliko slajša od tiste, ki jo kupiš.",
    },
  },
  {
    id: 6,
    title: "Pomoč drugim",
    image: imageModules["/src/lib/assets/icons/6.png"].default,
    scenario:
      "Cel mesec si varčeval/a in zdaj imaš končno 20 € za novo majico, ki si jo želiš. V šoli pa ravno ta teden zbirajo prostovoljne prispevke za sošolca, čigar družina se je znašla v stiski.",
    options: {
      A: "Denar je moj in trdo sem varčeval/a zanj. Kupim si majico.",
      B: "Odpovem se majici in celoten znesek (20 €) darujem za sošolca.",
      C: "Sklenem kompromis: za sošolca darujem del denarja (npr. 5 ali 10 €), preostanek pa še naprej hranim za majico.",
    },
    feedback: {
      A: "Pravico imaš do svojega denarja in do uresničevanja svojih ciljev. To je pomemben del finančne samostojnosti. A včasih nam življenje ponudi priložnost, da razmislimo tudi o potrebah drugih.",
      B: "To je izjemno radodarna in plemenita odločitev. Kaže na visoko stopnjo empatije in solidarnosti. Tvoja pomoč bo nekomu veliko pomenila.",
      C: "Odlično ravnovesje! Pokazal/a si solidarnost in pomagal/a sošolcu, hkrati pa nisi opustil/a svojega cilja. To dejanje kaže na zrelo razmišljanje in sposobnost postavljanja prioritet.",
    },
  },
  {
    id: 7,
    title: "Opravljeno delo",
    image: imageModules["/src/lib/assets/icons/7.png"].default,
    scenario:
      'Sosed te prosi, da mu za 15 € pokosiš travo na vrtu. Delo lahko opraviš "po hitrem postopku" v pol ure in pustiš nekaj nepokošenih delov ob robovih, ali pa si vzameš eno uro in ga opraviš zares natančno. Soseda verjetno ne bo doma, da bi preveril/a.',
    options: {
      A: "Naredim hitro in na pol. Dobil/a bom enak denar za manj dela.",
      B: "Delo opravim kar se da dobro in natančno, tudi če porabim več časa.",
      C: "Naredim hitro. Če se bo sosed pritožil, bom pa popravil/a.",
    },
    feedback: {
      A: "Res je, da bi tako prihranil/a čas, a vprašaj se, ali je to pošteno do soseda, ki ti je zaupal, da boš dobro opravil/a delo. Slaba storitev lahko uniči tvoj ugled in prihodnje priložnosti za zaslužek. Gre za vprašanje delovne etike.",
      B: "Odlično! Kažeš na visoko odgovornost in poštenost. Dobro opravljeno delo ti ne prinese le denarja, ampak tudi dober občutek, ponos in ugled. Sosed te bo zagotovo še kdaj prosil za pomoč ali te priporočil drugim.",
      C: "To je tvegan pristop. Zakaj ne bi dela že prvič opravil/a dobro? Popravljanje napak vzame dodaten čas in energijo. Graditi zaupanje je vedno lažje, kot ga popravljati.",
    },
  },
  {
    id: 8,
    title: "Moč blagovne znamke",
    image: imageModules["/src/lib/assets/icons/8.png"].default,
    scenario:
      "Potrebuješ nov šolski nahrbtnik. Starši so ti namenili 70 €. V trgovini vidiš dva: enega zelo priljubljene znamke za 70 € in drugega zelo podobnega in enako kakovostnega, a neznane znamke, za 40 €.",
    options: {
      A: "Vzamem nahrbtnik priljubljene znamke. Pomembno mi je, da imam enake stvari kot prijatelji.",
      B: "Vzamem cenejši nahrbtnik za 40 € in preostalih 30 € prihranim za kaj drugega, kar si želim.",
      C: "Prosim starše, da mi dajo 70 € v gotovini, kupim cenejši nahrbtnik, preostanek pa porabim zase, ne da bi jim povedal/a.",
    },
    feedback: {
      A: "Želja po pripadnosti je povsem normalna, vprašaj pa se, ali je logotip vreden 30 €? Oglasi nas pogosto prepričujejo, da z nakupom znamke kupimo tudi priljubljenost. To je priložnost za kritično razmišljanje.",
      B: "To je zelo pametna finančna odločitev! Prepoznal/a si vrednost za denar. Ne le, da si dobil/a odličen nahrbtnik, ustvaril/a si tudi 30 € presežka, ki ga lahko nameniš za drug, pomemben cilj. To je aktivno upravljanje s proračunom.",
      C: "Ta odločitev je nepoštena do staršev in temelji na zavajanju. Zaupanje je najpomembnejša valuta v družini. Dober odnos je vreden veliko več kot 30 €.",
    },
  },
];
