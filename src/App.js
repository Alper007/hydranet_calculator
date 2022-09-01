import './App.css';
import { hasPointerEvents } from '@testing-library/user-event/dist/utils';
import bootstrap from 'bootstrap'
import react, {useEffect, useState} from "react"; 


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
        
        <div className="header">
          <p>HDX DEX Fee Distribution Calculator Application</p>
        </div>

        <div className='infos1'>
          <div className='infofirst'>
            Total deducted fee ({MA} month): 
            <div className='numbers'><p>${comma(TDF)}</p></div>
          </div>
          <div className='info'>
            HNFT holders will get (%35):
            <div className='numbers'><p>${comma(TSF)}</p></div>
          </div>
          <div className='info'>
           Liq providers will get(%60):
           <div className='numbers'><p>${comma(TPF)}</p></div>
          </div>
          <div className='info'>
            Treasury will get(%5):
            <div className='numbers'><p>${comma(TTF)}</p></div>
          </div>
      </div>
        <div className='div'>
          <div className='text'>
           HNFTs locking duration(month):  
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
            Daily DEX volume:
          </div>
          <div  className='input'>
            <input type="range" min="1" max="50000001" value={DDV} className="slider" id="2" step="100000"
            onChange={(e)=>setDDV(e.target.value)}/>  
          </div> 
          <div className='value'>
            ${comma(DDV-1)}
          </div>
        </div>
        {/* <div className='div'>
          <div className='text'>
            Hdx price:
          </div>
          <div  className='input'>
            <input type="range" min="1" max="100" value={P} className="slider" id="0" 
            onChange={(e)=>setP(e.target.value)}/>
          </div> 
          <div className='value'>
            ${P}
          </div>
        </div> */}
        <div className='div'>
          <div className='text'>
            Your HNFT amount:
          </div>
          <div  className='input'>
            <input type="range" min="1" max="100" value={B1} className="slider" id="3" 
            onChange={(e)=>setB1(e.target.value)}/>
          </div> 
          <div className='value'>
            {B1}
          </div>
        </div>
        <div className='div'>
          <div className='text'>
            Total HNFT amount:
          </div>
          <div  className='input'>
            <input type="range" min="0" max="10000" value={B2} className="slider" id="4" 
            onChange={(e)=>setB2(e.target.value)}/>
          </div> 
          <div className='value'>
            {B2}
          </div>
        </div>
        <div className='div'>
          <div className='text'>
            Your MP amount (should be {Math.floor(MPSB())}):
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
            Total MP amount (should be {comma(Math.floor(TMPSB()))}):
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
            How much HDX are you staking:
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
            Total staked HDX amount:
          </div>
          <div  className='input'>
            <input type="range" min="1" max="10000000" value={D2} className="slider" id="8" 
            onChange={(e)=>setD2(e.target.value)}/>
          </div> 
          <div className='value'>
            {D2}
          </div>
        </div>
      </div>
      <div className='infos2'>
        <div className='infofirst'>
          Total revenue (for {MA} month):
          <div className='numbers'><p>${comma(YTR)}</p></div>
        </div>
        <div className='info'>
          Daily revenue:
          <div className='numbers'><p>${comma(DR)}</p></div>
        </div>
        <div className='info'>
          Montly revenue:
          <div className='numbers'><p>${comma(MR)}</p></div>
        </div>
        <div className='info'>
          Yearly revenue:
          <div className='numbers'><p>${comma(YR)}</p></div>
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
  // E: individual fees
  // DR: daily revenue
  // MR: monthly revenue
  // YR: yearly revenue
 
export default App;
