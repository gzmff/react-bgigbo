import React, { useMemo, useState, useEffect } from 'react';
import './style.css';
import Qrcode from 'qrcode.react';

export default function App() {
  const [numberT, setNumberT] = useState(0);
  function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL('image/png');
    return image;
  }
  useEffect(() => {
    const c = document.getElementById('ccc');
    c.width = 386;
    c.height = 578;
    const ctx = c.getContext('2d');
    const img = new Image();
    img.src =
      'https://tse1-mm.cn.bing.net/th/id/OIP-C.nRlAFygdctTCHmIWN7GxRwHaEK?pid=ImgDet&rs=1';
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 386, 578);
      ctx.save();
      const qrcode = document.getElementById('qrcode');
      const codeimg = convertCanvasToImage(qrcode);
      codeimg.onload = () => {
        ctx.drawImage(codeimg, 10, 10, 80, 80);
        ctx.save();
      };
    };
    // codeimg.onload = () => {
    //   ctx.drawImage(codeimg, 10, 10, 240, 240);
    //   ctx.save();
    // };
  }, []);
  const styles = useMemo(
    () => ({
      color: numberT % 2 == 1 ? 'pink' : 'blue',
    }),
    [numberT]
  );
  const DemoUseMemo = () => {
    const [number, setNumber] = useState(0);
    const newLog = useMemo(() => {
      const log = () => {
        console.log(3333);
        /* 点击span之后 打印出来的number 不是实时更新的number值 */ console.log(
          number
        );
        return number;
      };
      return log;
      /* [] 没有 number */
    }, [number]);
    return (
      <div>
        <div onClick={() => newLog()}>打印{newLog()}</div>
        <span onClick={() => setNumber(number + 1)}>增加</span>
      </div>
    );
  };
  const nameList = ['apple', 'peer', 'banana', 'lemon'];
  const Example = (props) => {
    // 产品名称、价格
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('apple');

    // 假设有一个业务函数  获取产品的名字
    const getProductName = useMemo(() => {
      console.log('getProductName触发');
      return () => name;
    }, [name]);

    return (
      <div>
        <p>{name}</p>
        <p>{price}</p>
        <p>{getProductName()}</p>
        <button onClick={() => setPrice(price + 1)}>价钱+1</button>
        <button
          onClick={() =>
            setName(nameList[(Math.random() * nameList.length) << 0])
          }
        >
          修改名字
        </button>
      </div>
    );
  };
  const DDD = useMemo(() => {
    return () => <Example />;
  }, [numberT]);
  return (
    <div>
      <DemoUseMemo />
      <DDD />
      <canvas id={'ccc'} style={{ width: 386, height: 579 }}></canvas>
      <Qrcode
        id={'qrcode'}
        size={90}
        value={
          'https://www.bilibili.com/video/BV1gS4y1K7bQ?spm_id_from=444.41.list.card_archive.click&vd_source=7d2ea0dd85eb88d359737f371de48450'
        }
      ></Qrcode>
      <h1
        style={{ color: numberT % 2 == 0 ? 'pink' : 'blue' }}
        onClick={() => setNumberT(numberT + 1)}
      >
        Hello StackBlitz!
      </h1>
      <p onClick={() => console.log(numberT)}>
        Start editing to see some magic happen :)
      </p>
    </div>
  );
}
