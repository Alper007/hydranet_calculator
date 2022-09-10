import './App.css';
import {useEffect, useState} from "react";
import {BigNumber, ethers} from "ethers";
import { HDX_ABI, SHDX_ABI } from './info/abi.js';
import { ADDRESS, SHDXADDRESS } from './info/address.js';


function App() {

  // TDF:total deducted fee(monthly)
  // TSF:total stakers fee
  // TTF:total treasury fee
  // TPF:total providers fee
  // TDV:total dex volume
  // P:  hdx price
  // M:  month amount
  // A:  total DEX fees
  // B1: individual HNFTs
  // B2: total HNFTs
  // C1: individual MPs
  // C2: total MPs
  // D1: individual staked HDX
  // D2: total staked HDX
  // E: individual fees
  // DR: daily revenue
  // MR: monthly revenue
  // YR: yearly revenue
  // YTR:your total revenue
  // MPSB: mp should be
  // TMPSH: total mp should be

  const [DDV, setDDV] =useState(1);
  const [P, setP] =    useState(1);
  const [MA, setMA] =  useState(1);
  const [B1, setB1] =  useState(1);
  const [B2, setB2] =  useState(1);
  const [C1, setC1] =  useState(1);
  const [C2, setC2] =  useState(1);
  const [D1, setD1] =  useState(1);
  const [D2, setD2] =  useState(1);
  const [check, setCheck] = useState(true);
  const [price, setPrice] = useState("");

  const [Eng, setEng] = useState(true);
  const [lang, setLang] = useState("eng");
  const [totalHdx, setTotalHdx] = useState(BigNumber.from(0).toString());
  const [stakedHdx, setStakedHdx] = useState(BigNumber.from(0).toString());

  const [shdxAmount, setShdxAmount] = useState(BigNumber.from(0).toString());
  const [address, setAddress] = useState("");

  const provider = new ethers.providers.AlchemyProvider( "arbitrum" , "h4bsS1_3SZC0JOou9tz3xgg-fvrnG5-U" );
  const _HdxToken = new ethers.Contract(ADDRESS,HDX_ABI,provider);
  const _ShdxToken = new ethers.Contract(SHDXADDRESS, SHDX_ABI,provider);

  useEffect(()=>{
    _HdxToken.totalSupply()
    .then( (e) => setTotalHdx(e));
    _HdxToken.balanceOf("0xd20cdf95a08acdf8aa360232caeda6e59a06951d")
    .then( (a)=> setStakedHdx(a));
    setD2(BigNumber.from(stakedHdx).toString().slice(0,-9));
    setD1(BigNumber.from(shdxAmount).toString().slice(0,-9));
    
    fetch('https://api.coingecko.com/api/v3/coins/hydranet/tickers')
    .then( a => a.json())
    .then( b => {setPrice(b.tickers[0].last.toString().substr(0,6))})
    
  },[shdxAmount]);

  const fill = async () =>  {
    try{
      const a = await _ShdxToken.balanceOf(address.trim());
      setShdxAmount(a);
    }catch{
      alert("Please type a valid address")
    }
  }


const TDF = Math.floor(Number(MA)*(30*(Number(DDV))*3)/1000);
const TSF = Math.floor(TDF*35/100);
const TPF = Math.floor(TDF*60/100);
const TTF = Math.floor(TDF*5/100);


const YTR = Math.floor(0.35*TDF*((((Number(B1)+Number(C1)/26))*15000)+Number(D1))/(((((Number(B1)+Number(B2)+Number(C2)/26))*15000)+Number(D2))));
const DR = Math.floor(YTR/30/Number(MA));
const MR = Math.floor(YTR/Number(MA));
const YR = Math.floor(YTR*12/Number(MA));

const comma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const changex = () => {
  if(check === true){
    setCheck(false);
  }else{
    setCheck(true)
  }
}
const MPSB = () =>{
  var x;
  if(MA<=12){
    x=Math.floor(MA*2.17*B1);
  }else if(MA>12 && MA<=24){
    x=26*B1+Math.floor((MA-12)*2.17*B1)/2;
  }else if(MA>24 && MA<=36){
    x=39*B1+Math.floor((MA-24)*2.17*B1)/4;
  }else if(MA>36 && MA<=48){
    x=45.5*B1+Math.floor((MA-36)*2.17*B1)/8;
  }
  return x;
}


const changeLaguage = () =>{
const language = document.getElementById("lang").value;
 switch(language){
  case "eng":  setLang("eng");
    break;
  case "tur":  setLang("tur");
    break;
  case "ger":  setLang("ger");
    break;
  case "jap":  setLang("jap");
    break;
 }
}
  const TMPSB = () =>{
    var y;
    if(MA<=12){
      y=Math.floor(MA*2.17*B2);
    }else if(MA>12 && MA<=24){
      y=26*B2+Math.floor((MA-12)*2.17*B2)/2;
    }else if(MA>24 && MA<=36){
      y=39*B2+Math.floor((MA-24)*2.17*B2)/4;
    }else if(MA>36 && MA<=48){
      y=45.5*B2+Math.floor((MA-36)*2.17*B2)/8;
    }
    return y;
}

  return (
    <div className="App">
        <div className='Navbar'>
            <div className='hydranet'>HYDRANET</div>
            <div ><img className='hdxlogo'src='https://i.hizliresim.com/ocna173.png'/></div>
          <div className='navs'>
          <div className='nav'>
            <div className='navtext'>
            {(() => {
                switch (lang) {
                  case 'eng':
                    return   "Hdx Price:"
                  case 'tur':
                    return "HDX Fiyatı:"
                  case 'ger':
                    return "Hdx Preis "
                  case 'jap':
                    return "HDX価格"
                  default:
                    return null
                }
              })()}
              
              </div>
            <div className='navnumber'>{(price)} </div>
          </div>
          <div className='nav'>
            <div className='navtext'>
            {(() => {
                switch (lang) {
                  case 'eng':
                    return   "Total Supply:"
                  case 'tur':
                    return "Total Arz:"
                  case 'ger':
                    return "Gesamtangebot "
                  case 'jap':
                    return "総供給量"
                  default:
                    return null
                }
              })()}
              </div>
            <div className='navnumber'>{comma(BigNumber.from(totalHdx).toString().slice(0,-9))} </div>
          </div>
          <div className='nav'>
          <div className='navtext'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return   "Staked HDX:"
                  case 'tur':
                    return "Staked HDX:"
                  case 'ger':
                    return " Gestakte HDX "
                  case 'jap':
                    return "ステークされたHDX量"
                  default:
                    return null
                }
              })()}
          </div>
          <div className='navnumber'>{comma(BigNumber.from(stakedHdx).toString().slice(0,-9))} </div>
          </div>
          <div className='nav'>
          <div className='navtext'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return   "Staked Ratio:"
                  case 'tur':
                    return "Stake Oranı:"
                  case 'ger':
                    return "Staking Verhältnis  "
                  case 'jap':
                    return "ステーク中のHDXの比率"
                  default:
                    return null
                }
              })()}
            </div>
          <div className='navnumber'> {(BigNumber.from(stakedHdx).toString().slice(0,-9)/BigNumber.from(totalHdx).toString().slice(0,-9)*100).toString().slice(0,-12)}%</div>
          </div>
          </div>
          <div className='button'>
          </div>
          <div  >
            <select className="option" id="lang" onChange={changeLaguage}>  
              <option value="eng">English</option>  
              <option value="tur">Turkish</option>  
              <option value="ger">German</option>  
              <option value="jap">Japanese</option>  
            </select> 
          </div>
        </div>

        <div className="header">
          <div className="checkbox">
          {(() => {
                switch (lang) {
                  case 'eng':
                    return   "Slider :"
                  case 'tur':
                    return "Slider :"
                  case 'ger':
                    return "Schieberegler :"
                  case 'jap':
                    return "スライダー :"
                  default:
                    return null
                }
              })()}
              {check ? <input className="checkbtn"type="button" value=
              {(() => {
                switch (lang) {
                  case 'eng':
                    return   "Hide"
                  case 'tur':
                    return "Gizle"
                  case 'ger':
                    return "verbergen"
                  case 'jap':
                    return "隠す"
                  default:
                    return null
                }
              })()}
               onClick={changex}></input> : <input type="button" className="checkbtn" value=
               {(() => {
                switch (lang) {
                  case 'eng':
                    return    "Show"
                  case 'tur':
                    return "Göster"
                  case 'ger':
                    return "anzeigen "
                  case 'jap':
                    return "表示する"
                  default:
                    return null
                }
              })()}
               onClick={changex}></input>}</div>
          {(() => {
        switch (lang) {
          case 'eng':
            return <p>HDX DEX Fee Distribution Calculator Application</p>
          case 'tur':
            return <p>HDX DEX FEE Dağıtım Hesaplama Uygulaması</p>
          case 'ger':
            return <p>HDX DEX Gebührenverteilungsrechner</p>
          case 'jap':
            return <p>HDX DEX 手数料分配計算アプリケーション</p>
          default:
            return null
        }
      })()}
          
        </div>


        <div className='bars'>
        <div  className='div'>
          <div>
            <input  className="biginput" value={address} onChange={(e)=> setAddress(e.target.value)}
              type="text" placeholder=
              {(() => {
                switch (lang) {
                  case 'eng':
                    return "Type your HDX address to fill variables automatically"
                  case 'tur':
                    return "Boşlukları otomatik doldurmak için hdx adresinizi giriniz"
                  case 'ger':
                    return "Wenn Sie die Adresse von HDX eingeben, werden automatisch zwei Variablen ausgefüllt."
                  case 'jap':
                    return "HDXのアドレスを入力すると、自動的に２つの変数が埋められます。"
                  default:
                    return null
                }
              })()}
              />
          </div>
          <div>
            <button className="btn btn-info" onClick={fill}>Click</button>
          </div>
        </div>

          <div className='div'>
            <div className='inputtop'>
              <div className='text'>
              {(() => {
                switch (lang) {
                  case 'eng':
                    return "HNFTs locking duration(month) : "
                  case 'tur':
                    return "HNFT kitleme süresi (Ay) : "
                  case 'ger':
                    return "HNFT-Sperrfrist (Monate):"
                  case 'jap':
                    return "HNFTのロック期間（月）："
                  default:
                    return null
                }
              })()}
               <b>{MA}</b>
              </div>
              <div>
                <input className="inputNumber" type="number" placeholder="1<x<48" min="1" max="48" value={MA}
                onChange={(e)=>{if(e.target.value<=48 && e.target.value>=0)setMA(e.target.value)}}/>
              </div>
              {/* <div className='value'>
                {MA}
              </div> */}
             </div>
              <div  className='input'>{check ? <input type="range" min="1" max="48" value={MA} className="slider" id="1"
                onChange={(e)=>setMA(e.target.value)}/> : undefined}
              </div>
          </div>

        <div className='div'>
        <div className='inputtop'>
          <div className='text'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return "Daily DEX volume : "
                  case 'tur':
                    return "Günlük DEX hacmi : "
                  case 'ger':
                    return "DEX-Handelsvolumen pro Tag:"
                  case 'jap':
                    return "一日あたりのDEXの取引ボリューム："
                  default:
                    return null
                }
              })()}
             
          <b>${comma(DDV)}</b>
          </div>  <input className="inputNumber" type="number" placeholder="1<x<500000000" min="1" max="500000000" value={DDV}
            onChange={(e)=>{if(e.target.value<=500000000 && e.target.value>=0)setDDV(e.target.value)}}/>

          {/* <div className='value'>
            ${comma(DDV)}
          </div> */}
          </div>
          <div  className='input'>{check ? <input type="range" min="0" max="500000000" value={DDV} className="slider" id="2" step="100000"
            onChange={(e)=>setDDV(e.target.value)}/> : undefined}
            
          </div>
        </div>
        <div className='div'>
        <div className='inputtop'>
          <div className='text'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return "Hdx price : "
                  case 'tur':
                    return "HDX fiyatı : "
                  case 'ger':
                    return "HDX Preis:"
                  case 'jap':
                    return "HDX価格："
                  default:
                    return null
                }
              })()}
          <b>${P}</b>
           </div> <input className="inputNumber" type="number" placeholder="0<x<100" min="0.1" max="100" step="0.1" value={P}
            onChange={(e)=>{if(e.target.value<=100 && e.target.value>=0)setP(e.target.value)}}/>

          {/* <div className='value'>
            ${P}
          </div> */}
          </div>
          <div  className='input'>{check ? <input type="range" min="0" max="100" value={P} className="slider" id="0" step="0.1"
            onChange={(e)=>setP(e.target.value)}/> : undefined}
            
          </div>
        </div>
        <div className='div'>
        <div className='inputtop'>
          <div className='text'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return "Your HNFT amount : "
                  case 'tur':
                    return "HNFT adediniz : "
                  case 'ger':
                    return "Ihre HNFT-Menge:"
                  case 'jap':
                    return "あなたのHNFT数："
                  default:
                    return null
                }
              })()}
          <b>{B1}</b>
          </div>  <input className="inputNumber" type="number" placeholder="1<x<200" min="1" max="200" value={B1}
            onChange={(e)=>{if(e.target.value<=200 && e.target.value>=0)setB1(e.target.value)}}/>

          {/* <div className='value'>
            {B1}
          </div> */}
          </div>
          <div  className='input'>{check ? <input type="range" min="1" max="200" value={B1} className="slider" id="3"
            onChange={(e)=>setB1(e.target.value)}/> : undefined}
            
          </div>
        </div>
        <div className='div'>
          <div className='inputtop'>
            <div className='text'>
            {(() => {
                switch (lang) {
                  case 'eng':
                    return "Total HNFT amount : "
                  case 'tur':
                    return  "Toplam HNFT adedi : "
                  case 'ger':
                    return "Gesamtzahl der HNFT:"
                  case 'jap':
                    return "総HNFT数："
                  default:
                    return null
                }
              })()}
          <b>{comma(B2)}</b>
          </div>  <input className="inputNumber" type="number" placeholder="1<x<10000" min="1" max="10000" value={B2}
            onChange={(e)=>{if(e.target.value<=10000 && e.target.value>=0)setB2(e.target.value)}}/>

          {/* <div className='value'>
            {comma(B2)}
          </div> */}
          </div>
          <div  className='input'>
            {check ? <input type="range" min="0" max="10000" value={B2} className="slider" id="4"
            onChange={(e)=>setB2(e.target.value)}/> : undefined}
           </div> 
          
        </div>
        <div className='div'>
        <div className='inputtop'>
          <div className='text'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return <div>Your MP (should be {Math.floor(MPSB())}) : <b>{C1}</b></div>
                  case 'tur':
                    return  <div>Mp miktarınız ({Math.floor(MPSB())} olmalı) :  <b>{C1}</b></div>
                  case 'ger':
                    return <div>Ihre MP-Anzahl: ({Math.floor(MPSB())} sollte x sein) :  <b>{C1}</b></div>
                  case 'jap':
                    return <div>あなたのMP数： ({Math.floor(MPSB())} （であるはず）) :  <b>{C1}</b></div>
                  default:
                    return null
                }
              })()}
          
           </div> <input className="inputNumber" type="number" placeholder="1<x<5000" min="1" max="5000" value={C1}
            onChange={(e)=>{if(e.target.value<=5000 && e.target.value>=0)setC1(e.target.value)}}/>

          {/* <div className='value'>
            {C1}
          </div> */}
          </div>
          <div  className='input'>{check ?  <input type="range" min="0" max="5000" value={C1} className="slider" id="5"
            onChange={(e)=>setC1(e.target.value)}/> : undefined}
           
            
          </div>
        </div>
        <div className='div'>
        <div className='inputtop'>
          <div className='text'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return <div>Total MP (should be {comma(Math.floor(TMPSB()))}) : <b>{comma(C2)}</b></div>
                  case 'tur':
                    return  <div>Toplam Mp ({comma(Math.floor(TMPSB()))} olmalı) : <b>{comma(C2)}</b></div>
                  case 'ger':
                    return <div>MP insgesamt: ({comma(Math.floor(TMPSB()))} sollte x sein) : <b>{comma(C2)}</b></div>
                  case 'jap':
                    return <div>総MP数： ({comma(Math.floor(TMPSB()))} （であるはず）) : <b>{comma(C2)}</b></div>
                  default:
                    return null
                }
              })()}
          </div>
          <input className="inputNumber" type="number" placeholder="1<x<500000" min="1" max="500000" value={C2}
            onChange={(e)=>{if(e.target.value<=500000 && e.target.value>=0)setC2(e.target.value)}}/>
          {/* <div className='value'>
            {comma(C2)}
          </div> */}
          </div>
          <div  className='input'>{check ? <input type="range" min="0" max="500000" value={C2} className="slider" id="6"
            onChange={(e)=>setC2(e.target.value)}/> : undefined}
            
          </div>
        </div>
        <div className='div'>
        <div className='inputtop'>
          <div className='text'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return " How much HDX you staking : "
                  case 'tur':
                    return  "Stake'deki HDX miktarınız : "
                  case 'ger':
                    return "Die Menge an HDX, die Sie einsetzen, beträgt:"
                  case 'jap':
                    return "あなたがステーキングしているHDX量："
                  default:
                    return null
                }
              })()}
          <b>{D1}</b>
          </div>  <input className="inputNumber" type="number" placeholder="1<x<10000000" min="1" max="10000000" default="0"value={D1}
            onChange={(e)=>{if(e.target.value===""){e.target.value=0}if(e.target.value<=10000000 && e.target.value>=0)setD1(e.target.value)}}/>

          {/* <div className='value'>
            {D1}
          </div> */}
          </div>
          <div  className='input'>{check ? <input type="range" min="0" max="10000000" value={D1} className="slider" id="7"
            onChange={(e)=>setD1(e.target.value)}/> : undefined}
            
          </div>
        </div>
        <div className='div'>
          <div className='inputtop'>
            <div className='text'>
            {(() => {
                switch (lang) {
                  case 'eng':
                    return "Total staked HDX : "
                  case 'tur':
                    return  "Toplam stake deki HDX : "
                  case 'ger':
                    return "Gesamter HDX-Einsatz:"
                  case 'jap':
                    return "ステーキングされた総HDX量："
                  default:
                    return null
                }
              })()}
            <b>{D2}</b>
            </div>  <input className="inputNumber" type="number" placeholder="1<x<150000000" min="1" max="150000000" value={D2}
              onChange={(e)=>{if(e.target.value<=150000000 && e.target.value>=0)setD2(e.target.value)}}/>

            {/* <div className='value'>
              {D2}
            </div> */}
          </div>
            <div  className='input'>{check ? <input type="range" min="1" max="150000000" value={D2} className="slider" id="8"
              onChange={(e)=>setD2(e.target.value)}/> : undefined}
              
          </div>
        </div>
        </div>

    <div className='inf'>
        <div className='infos1'>
           
          <div className='info'>
          <div className='textright'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return "HNFT holders will get (%35):"
                  case 'tur':
                    return  "HNFT sahiplerinin alacağı (%35):"
                  case 'ger':
                    return "Einnahmen der HNFT-Eigentümer (35%):"
                  case 'jap':
                    return "HNFTの所有者たちの収益（35％）："
                  default:
                    return null
                }
              })()}
            
            </div>

         <div className='numbers'>
          ${comma(TSF)}
         </div>
          </div>
          <div className='info'>
          <div className='textright'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return "Liq providers will get(%60):"
                  case 'tur':
                    return  "Likidite sağlayıcıları (%60):"
                  case 'ger':
                    return "Umsatz der Liquiditätsanbieter (60 %):"
                  case 'jap':
                    return "流動性プロバイダーたちの収益（60％）："
                  default:
                    return null
                }
              })()}
            </div>

         <div className='numbers'>
         ${comma(TPF)}
         </div> </div>
          <div className='info'>
          <div className='textright'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return "Treasury will get(%5):"
                  case 'tur':
                    return  "Hazinenin alacağı (%5):"
                  case 'ger':
                    return "Einnahmen aus der Schatzkammer (5%):"
                  case 'jap':
                    return "公庫（Treasury）の収益（５％）："
                  default:
                    return null
                }
              })()}
            </div>
            <div className='numbers'>${comma(TTF)}</div>
          </div>
          <div className='infolast'> 
           <div className='textright'>
           {(() => {
                switch (lang) {
                  case 'eng':
                    return <p>Total deducted fee (for {MA} month):</p>
                  case 'tur':
                    return  <p>Toplam kesilen fee ({MA} ay için)</p>
                  case 'ger':
                    return <p>Gezahlte Gebühren ({MA} Mona)</p>
                  case 'jap':
                    return <p>支払われた手数料 ({MA} か月)</p>
                  default:
                    return null
                }
              })()}
           </div>
           <div className='numbers'>
              ${comma(TDF)}
            </div>
            </div>
        </div>
       
        <div className='infos2'>
          
          <div className='info'>
          <div className='textright'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return  <p>Your {B1} hnft worth ({15000*B1} hdx) :</p>
                  case 'tur':
                    return  <p>{B1} adet HNFT değeri ({15000*B1} hdx) :</p>
                  case 'ger':
                    return <p> Preis von {B1} HNFT ({15000*B1} hdx) :</p>
                  case 'jap':
                    return <p>{B1} HNFTの価格 ({15000*B1} hdx) :</p>
                  default:
                    return null
                }
              })()}
            </div>

         <div className='numbers'>${comma(Math.floor(15000*B1*P))}</div>
           </div>
          <div className='info'>
          <div className='textright'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return <p>Your staked HDX worth ({D1}):</p>
                  case 'tur':
                    return  <p>Stake'deki HDX'leriniz({D1}) :</p>
                  case 'ger':
                    return <p>Die Gesamtmenge an HDX, die Sie einsetzen({D1}) :</p>
                  case 'jap':
                    return <p>あなたがステークしているHDXの総額：({D1}) :</p>
                  default:
                    return null
                }
              })()}
           </div>

        <div className='numbers'>${comma(Math.floor(D1*P))}</div>
        </div>
          <div className='info'>
          <div className='textright'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return <p>Your total HDX worth ({(15000*B1)+Number(D1)}):</p>
                  case 'tur':
                    return  <p>Tüm HDX'lerinizin değeri({(15000*B1)+Number(D1)}) :</p>
                  case 'ger':
                    return <p>Marktkapitalisierung Ihres HDX:({(15000*B1)+Number(D1)}) :</p>
                  case 'jap':
                    return <p>あなたのHDXの時価総額：({(15000*B1)+Number(D1)}) :</p>
                  default:
                    return null
                }
              })()}
           </div>
            <div className='numbers'>${comma(Math.floor(((15000*B1)+Number(D1))*P))}</div>
          </div>
          <div className='infolast'>
          <div className='textright'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return <p>Your net worth (End of the {MA}. month):</p>
                  case 'tur':
                    return  <p>Toplam varlığınız ({MA}. ayın sonunda):</p>
                  case 'ger':
                    return <p>Marktkapitalisierung nach einem  (Monat:{MA}):</p>
                  case 'jap':
                    return <p>あなたの１か月後の時価総額： ({MA} ay):</p>
                  default:
                    return null
                }
              })()}
           </div>

         <div className='numbers'>${comma(Math.floor(((15000*B1)+Number(D1))*P+YTR))}</div>
          </div>
        </div>
        <div className='infos3'>
          
          <div className='info'>
          <div className='textright'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return "Daily revenue:"
                  case 'tur':
                    return  "Günlük gelir:"
                  case 'ger':
                    return "Täglicher Umsatz:"
                  case 'jap':
                    return "１日あたりの収益："
                  default:
                    return null
                }
              })()}
        </div>
              <div className='numbers'>${comma(DR)}</div>
          </div>
          <div className='info'>
          <div className='textright'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return "Montly revenue:"
                  case 'tur':
                    return  "Aylık gelir:"
                  case 'ger':
                    return "Umsatz pro Monat:"
                  case 'jap':
                    return "１か月あたりの収益："
                  default:
                    return null
                }
              })()}
            </div>
            <div className='numbers'>${comma(MR)}</div>
          </div>
          <div className='info'>
          <div className='textright'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return "Yearly revenue:" 
                  case 'tur':
                    return  "Yıllık gelir:"
                  case 'ger':
                    return "Umsatz pro Jahr:"
                  case 'jap':
                    return "１年間あたりの収益："
                  default:
                    return null
                }
              })()}
            </div>
            <div className='numbers'>${comma(YR)}</div>
          </div>
          <div className='infolast'>
          <div className='textright'>
          {(() => {
                switch (lang) {
                  case 'eng':
                    return <p>Total revenue (for {MA} month):</p>
                  case 'tur':
                    return  <p>Toplam gelir ({MA} ay için)</p>
                  case 'ger':
                    return <p>Gesamteinnahmen ({MA} Monat)</p>
                  case 'jap':
                    return <p>１年間あたりの収益：({MA} ay için)</p>
                  default:
                    return null
                }
              })()}
        </div>
            <div className='numbers'>${comma(YTR)}</div>
          </div>
        </div>
    </div>
  </div>
  );
}
  // TDF:total deducted fee(monthly)
  // TSF:total stakers fee
  // TTF:total treasury fee
  // TPF:total providers fee
  // TDV:total dex volume
  // P:  hdx price
  // M:  month amount
  // A:  total DEX fees
  // B1: individual HNFTs
  // B2: total HNFTs
  // C1: individual MPs
  // C2: total MPs
  // D1: individual staked HDX
  // D2: total staked HDX
  // E:  individual fees
  // DR: daily revenue
  // MR: monthly revenue
  // YR: yearly revenue

  // "dev": "react-scripts start",
  //   "start": "serve -s build",
  //   "build": "react-scripts build",
  //   "test": "react-scripts test --env=jsdom",
  //   "eject": "react-scripts eject",
  //   "heroku-postbuild": "npm run build"


export default App;
