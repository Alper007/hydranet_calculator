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

  const [Eng, setEng] = useState(true);
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

const changeLange = () =>{
  if (Eng === true){
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
        <div className='Navbar'>
            <div className='hydranet'>HYDRANET</div>
            <div ><img className='hdxlogo'src='https://i.hizliresim.com/ocna173.png'/></div>
          <div className='navs'>
          <div className='nav'>
            <div className='navtext'>Total Supply:</div>
            <div className='navnumber'>{comma(BigNumber.from(totalHdx).toString().slice(0,-9))} </div>
          </div>
          <div className='nav'>
          <div className='navtext'>Staked HDX:</div>
          <div className='navnumber'>{comma(BigNumber.from(stakedHdx).toString().slice(0,-9))} </div>
          </div>
          <div className='nav'>
          <div className='navtext'>Staked Ratio:</div>
          <div className='navnumber'> {(BigNumber.from(stakedHdx).toString().slice(0,-9)/BigNumber.from(totalHdx).toString().slice(0,-9)*100).toString().slice(0,-12)}%</div>
          </div>
          </div>
          <div className='button'>
            <button className="btn btn-primary" onClick={changeLange}>{Eng ? "TURKISH" : "ENGLISH"}</button>
          </div>
        </div>

        <div className="header">
          <div className="checkbox">Slider :  {check ? <input className="checkbtn"type="button" value="Hide" onClick={changex}></input> : <input type="button" className="checkbtn" value="Show" onClick={changex}></input>}</div>
          <p>{Eng ? "HDX DEX Fee Distribution Calculator Application" : "HDX DEX FEE Dağıtım Hesaplama Uygulaması"}</p>
        </div>


        <div className='bars'>
        <div  className='div'>
          <div>
            <input  className="biginput" value={address} onChange={(e)=> setAddress(e.target.value)}
              type="text" placeholder="Type your HDX address to fill variables automatically"/>
          </div>
          <div>
            <button className="btn btn-info" onClick={fill}>Click</button>
          </div>
        </div>

          <div className='div'>
            <div className='inputtop'>
              <div className='text'>
               {Eng ? "HNFTs locking duration(month) : " : "HNFT kitleme süresi (Ay) : "}<b>{MA}</b>
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
          {Eng ? "Daily DEX volume : " : "Günlük DEX hacmi : "}<b>${comma(DDV)}</b>
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
          {Eng ? "Hdx price : " : "HDX fiyatı : "}<b>${P}</b>
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
          {Eng ? "Your HNFT amount : " : "HNFT adediniz : "}<b>{B1}</b>
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
          {Eng ? "Total HNFT amount : " : "Toplam HNFT adedi : "}<b>{comma(B2)}</b>
          </div>  <input className="inputNumber" type="number" placeholder="1<x<10000" min="1" max="10000" value={B2}
            onChange={(e)=>{if(e.target.value<=10000 && e.target.value>=0)setB2(e.target.value)}}/>

          {/* <div className='value'>
            {comma(B2)}
          </div> */}
          </div>
          <div  className='input'>{check ? <input type="range" min="0" max="10000" value={B2} className="slider" id="4"
            onChange={(e)=>setB2(e.target.value)}/> : undefined}
            
          </div>
        </div>
        <div className='div'>
        <div className='inputtop'>
          <div className='text'>
          {Eng ?  <div>Your MP (should be {Math.floor(MPSB())}) : <b>{C1}</b></div> : <div>Mp miktarınız ({Math.floor(MPSB())} olmalı) :  <b>{C1}</b></div>}
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
          {Eng ?  <div>Total MP (should be {comma(Math.floor(TMPSB()))}) : <b>{comma(C2)}</b></div> : <div>Toplam Mp ({comma(Math.floor(TMPSB()))} olmalı) : <b>{comma(C2)}</b></div>}
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
          {Eng ? " How much HDX you staking : " : "Stake'deki HDX miktarınız : "}<b>{D1}</b>
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
            {Eng ? "Total staked HDX : " : "Toplam stake deki HDX : "}<b>{D2}</b>
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
          <div className='textright'>{Eng ? "HNFT holders will get (%35):" : "HNFT sahiplerinin alacağı (%35):"}</div>

         <div className='numbers'>
          ${comma(TSF)}
         </div>
          </div>
          <div className='info'>
          <div className='textright'>{Eng ? "Liq providers will get(%60):" : "Likidite sağlayıcıları (%60):"}</div>

         <div className='numbers'>
         ${comma(TPF)}
         </div> </div>
          <div className='info'>
          <div className='textright'>{Eng ? "Treasury will get(%5):" : "Hazinenin alacağı (%5):"}</div>
            <div className='numbers'>${comma(TTF)}</div>
          </div>
          <div className='infolast'> 
           <div className='textright'>{Eng ? <p>Total deducted fee (for {MA} month):</p> : <p>Toplam kesilen fee ({MA} ay için)</p>}</div>
           <div className='numbers'>
              ${comma(TDF)}
            </div>
            </div>
        </div>
       
        <div className='infos2'>
          
          <div className='info'>
          <div className='textright'>{Eng ?  <p>Your {B1} hnft worth ({15000*B1} hdx) :</p> : <p>{B1} adet HNFT değeri ({15000*B1} hdx) :</p>}</div>

         <div className='numbers'>${comma(Math.floor(15000*B1*P))}</div>
           </div>
          <div className='info'>
          <div className='textright'>{Eng ?  <p>Your staked HDX worth ({D1}):</p> : <p>Stake'deki HDX'leriniz({D1}) :</p>}</div>

        <div className='numbers'>${comma(Math.floor(D1*P))}</div>
        </div>
          <div className='info'>
          <div className='textright'>{Eng ?  <p>Your total HDX worth ({(15000*B1)+Number(D1)}):</p> : <p>Tüm HDX'lerinizin değeri({(15000*B1)+Number(D1)}) :</p>}</div>
            <div className='numbers'>${comma(Math.floor(((15000*B1)+Number(D1))*P))}</div>
          </div>
          <div className='infolast'>
          <div className='textright'>{Eng ?  <p>Your net worth (End of the {MA}. month):</p> : <p>Toplam varlığınız ({MA}. ayın sonunda):</p>}</div>

         <div className='numbers'>${comma(Math.floor(((15000*B1)+Number(D1))*P+YTR))}</div>
          </div>
        </div>
        <div className='infos3'>
          
          <div className='info'>
          <div className='textright'>{Eng ? "Daily revenue:" : "Günlük gelir:"}</div>
              <div className='numbers'>${comma(DR)}</div>
          </div>
          <div className='info'>
          <div className='textright'>{Eng ? "Montly revenue:" : "Aylık gelir:"}</div>
            <div className='numbers'>${comma(MR)}</div>
          </div>
          <div className='info'>
          <div className='textright'>{Eng ? "Yearly revenue:" : "Yıllık gelir:"}</div>
            <div className='numbers'>${comma(YR)}</div>
          </div>
          <div className='infolast'>
          <div className='textright'>{Eng ?  <p>Total revenue (for {MA} month):</p> : <p>Toplam gelir ({MA} ay için)</p>}</div>
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


export default App;
