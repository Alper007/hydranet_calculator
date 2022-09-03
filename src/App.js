import './App.css';
import { hasPointerEvents } from '@testing-library/user-event/dist/utils';
import bootstrap from 'bootstrap'
import react, {useEffect, useState} from "react"; 
import {ethers} from "ethers";
import { HDX_ABI } from './info/abi';
import { ADDRESS } from './info/address';


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

  const [DDV, setDDV] = useState(1);
  const [P, setP] = useState(1);
  const [MA, setMA] = useState(1);
  const [B1, setB1] = useState(1);
  const [B2, setB2] = useState(0);
  const [C1, setC1] = useState(0);
  const [C2, setC2] = useState(0);
  const [D1, setD1] = useState(0);
  const [D2, setD2] = useState(1);
  const [Eng, setEng] = useState(true);
  const [contractHdx, setContractHdx] = useState("");
  const [totalHdx, setTotalHdx] = useState("");
 
  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    const _HdxToken = new ethers.Contract(HDX_ABI,ADDRESS,provider);
    setContractHdx(_HdxToken);
  });
  
  const _totalHdx = async () => {
    const hdx = await contractHdx.totalSupply();
    console.log(hdx);
  } 

  
const TDF = Math.floor(Number(MA)*(30*(Number(DDV))*3)/1000) ;
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

const changeLange = () =>{
  if (Eng == true){
    setEng(false)
  }else{
    setEng(true);
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
      <div className='bars'>
        <div className='Navbar'>
          {totalHdx}
          <button onClick={_totalHdx}></button>
        </div>
        <div className="header">
          <p>{Eng ? "HDX DEX Fee Distribution Calculator Application" : "HDX DEX FEE Dağıtım Hesaplama Uygulaması"}</p>
        </div>
        <div className='button'>
          <button className="btn btn-success" onClick={changeLange}>{Eng ? "TURKISH" : "ENGLISH"}</button>
        </div>
        <div className='infos1'>
          <div className='infofirst'>
           {Eng ? <p>Total deducted fee (for {MA} month):</p> : <p>Toplam kesilen fee ({MA} ay için)</p>}
            <div className='numbers'><p>${comma(TDF)}</p></div>
          </div>
          <div className='info'>
          {Eng ? "HNFT holders will get (%35):" : "HNFT sahiplerinin alacağı (%35):"}
            <div className='numbers'><p>${comma(TSF)}</p></div>
          </div>
          <div className='info'>
          {Eng ? "Liq providers will get(%60):" : "Likidite sağlayıcıları (%60):"}
           <div className='numbers'><p>${comma(TPF)}</p></div>
          </div>
          <div className='info'>
          {Eng ? "Treasury will get(%5):" : "Hazinenin alacağı (%5):"}
            <div className='numbers'><p>${comma(TTF)}</p></div>
          </div>
      </div>
        <div className='div'>
          <div className='text'>
          {Eng ? "HNFTs locking duration(month):" : "HNFT kitleme süresi (Ay):"}
          <input className="inputNumber" type="number" placeholder="    1<x<48" min="1" max="48" value={MA}  
          onChange={(e)=>{if(e.target.value<=48 && e.target.value>=0)setMA(e.target.value)}}/> 
          </div>
          <div  className='input'>
            <input type="range" min="1" max="48" value={MA} className="slider" id="1" 
            onChange={(e)=>setMA(e.target.value)}/>
          </div> 
          <div className='value'>
            {MA}
          </div>
        </div>
        <div className='div'>
          <div className='text'>
          {Eng ? "Daily DEX volume:" : "Günlük DEX hacmi:"}
            <input className="inputNumber" type="number" placeholder=" 1<x<500000000" min="1" max="500000000" value={DDV}  
            onChange={(e)=>{if(e.target.value<=500000000 && e.target.value>=0)setDDV(e.target.value)}}/> 
          </div>
          <div  className='input'>
            <input type="range" min="1" max="500000001" value={DDV} className="slider" id="2" step="100000"
            onChange={(e)=>setDDV(e.target.value)}/>  
          </div> 
          <div className='value'>
            ${comma(DDV-1)}
          </div>
        </div>
        <div className='div'>
          <div className='text'>
          {Eng ? "Hdx price:" : "HDX fiyatı:"}
            <input className="inputNumber" type="number" placeholder="     0<x<100" min="0.1" max="100" step="0.1" value={P} 
            onChange={(e)=>{if(e.target.value<=100 && e.target.value>=0)setP(e.target.value)}}/> 
          </div>
          <div  className='input'>
            <input type="range" min="0" max="100" value={P} className="slider" id="0" step="0.1"
            onChange={(e)=>setP(e.target.value)}/>
          </div> 
          <div className='value'>
            ${P}
          </div>
        </div>
        <div className='div'>
          <div className='text'>
          {Eng ? "Your HNFT amount:" : "HNFT adediniz:"}
            <input className="inputNumber" type="number" placeholder="     1<x<200" min="1" max="200" value={B1} 
            onChange={(e)=>{if(e.target.value<=200 && e.target.value>=0)setB1(e.target.value)}}/> 
          </div>
          <div  className='input'>
            <input type="range" min="1" max="200" value={B1} className="slider" id="3" 
            onChange={(e)=>setB1(e.target.value)}/>
          </div> 
          <div className='value'>
            {B1}
          </div>
        </div>
        <div className='div'>
          <div className='text'>
          {Eng ? "Total HNFT amount:" : "Toplam HNFT adedi:"}
            <input className="inputNumber" type="number" placeholder="1<x<10000" min="1" max="10000" value={B2}  
            onChange={(e)=>{if(e.target.value<=10000 && e.target.value>=0)setB2(e.target.value)}}/> 
          </div>
          <div  className='input'>
            <input type="range" min="0" max="10000" value={B2} className="slider" id="4" 
            onChange={(e)=>setB2(e.target.value)}/>
          </div> 
          <div className='value'>
            {comma(B2)}
          </div>
        </div>
        <div className='div'>
          <div className='text'>
          {Eng ?  <div>Your MP (should be {Math.floor(MPSB())}):<input className="inputNumber" type="number" placeholder="1<x<5000" min="1" max="5000" value={C1}  
            onChange={(e)=>{if(e.target.value<=5000 && e.target.value>=0)setC1(e.target.value)}}/></div> : <div>Mp miktarınız ({Math.floor(MPSB())} olmalı):<input className="inputNumber" type="number" placeholder="1<x<5000" min="1" max="5000" value={C1}  
            onChange={(e)=>{if(e.target.value<=5000 && e.target.value>=0)setC1(e.target.value)}}/></div>}

          </div>
          <div  className='input'>
            <input type="range" min="0" max="5000" value={C1} className="slider" id="5" 
            onChange={(e)=>setC1(e.target.value)}
            />
          </div> 
          <div className='value'>
            {C1}
          </div>
        </div>
        <div className='div'>
          <div className='text'>
          {Eng ?  <div>Total MP (should be {comma(Math.floor(TMPSB()))}):<input className="inputNumber" type="number" placeholder="1<x<500000" min="1" max="500000" value={C2}  
            onChange={(e)=>{if(e.target.value<=500000 && e.target.value>=0)setC2(e.target.value)}}/> </div> : <div>Toplam Mp ({comma(Math.floor(TMPSB()))} olmalı):<input className="inputNumber" type="number" placeholder="1<x<500000" min="1" max="500000" value={C2}  
            onChange={(e)=>{if(e.target.value<=500000 && e.target.value>=0)setC2(e.target.value)}}/> </div>}
          </div>
          <div  className='input'>
            <input type="range" min="0" max="500000" value={C2} className="slider" id="6" 
            onChange={(e)=>setC2(e.target.value)}/>
          </div> 
          <div className='value'>
            {comma(C2)}
          </div>
        </div>
        <div className='div'>
          <div className='text'>
          {Eng ? " How much HDX you staking:" : "Stake'deki HDX miktarınız:"}
            <input className="inputNumber" type="number" placeholder="1<x<1000000" min="1" max="1000000" value={D1}  
            onChange={(e)=>{if(e.target.value<=1000000 && e.target.value>=0)setD1(e.target.value)}}/> 
          </div>
          <div  className='input'>
            <input type="range" min="0" max="1000000" value={D1} className="slider" id="7" 
            onChange={(e)=>setD1(e.target.value)}/>
          </div> 
          <div className='value'>
            {D1}
          </div>
        </div>
        <div className='div'>
          <div className='text'>
          {Eng ? "Total staked HDX amount:" : "Toplam stake deki HDX miktarı:"}
            <input className="inputNumber" type="number" placeholder="1<x<100000000" min="1" max="100000000" value={D2}  
            onChange={(e)=>{if(e.target.value<=100000000 && e.target.value>=0)setD2(e.target.value)}}/> 
          </div>
          <div  className='input'>
            <input type="range" min="1" max="100000000" value={D2} className="slider" id="8" 
            onChange={(e)=>setD2(e.target.value)}/>
          </div> 
          <div className='value'>
            {D2}
          </div>
        </div>
      </div>

      <div className='infos2'>
        <div className='infofirst'>
        {Eng ?  <p>Total revenue (for {MA} month):</p> : <p>Toplam gelir ({MA} ay için)</p>}
          <div className='numbers'><p>${comma(YTR)}</p></div>
        </div>
        <div className='info'>
        {Eng ? "Daily revenue:" : "Günlük gelir:"}
          <div className='numbers'><p>${comma(DR)}</p></div>
        </div>
        <div className='info'>
        {Eng ? "Montly revenue:" : "Aylık gelir:"}
          <div className='numbers'><p>${comma(MR)}</p></div>
        </div>
        <div className='info'>
        {Eng ? "Yearly revenue:" : "Yıllık gelir:"}
          <div className='numbers'><p>${comma(YR)}</p></div>
        </div>
      </div>
      <div className='infos2'>
        <div className='infofirst'>
        {Eng ?  <p>Your net worth (End of the {MA}. month):</p> : <p>Toplam varlığınız ({MA}. ayın sonunda):</p>}
          <div className='numbers'><p>${comma(Math.floor(((15000*B1)+Number(D1))*P+YTR))}</p></div>
        </div>
        <div className='info'>
        {Eng ?  <p>Your {B1} hnft worth ({15000*B1} hdx) :</p> : <p>{B1} adet HNFT değeri ({15000*B1} hdx) :</p>}
          <div className='numbers'><p>${comma(Math.floor(15000*B1*P))}</p></div>
        </div>
        <div className='info'>
        {Eng ?  <p>Your staked HDX worth ({D1}):</p> : <p>Stake'deki HDX'leriniz({D1}) :</p>}
          <div className='numbers'><p>${comma(Math.floor(D1*P))}</p></div>
        </div>
        <div className='info'>
        {Eng ?  <p>Your total HDX worth ({(15000*B1)+Number(D1)}):</p> : <p>Tüm HDX'lerinizin değeri({(15000*B1)+Number(D1)}) :</p>}
          <div className='numbers'><p>${comma(Math.floor(((15000*B1)+Number(D1))*P))}</p></div>
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

 
export default App;
