import "./ProductCard.css";

const products = [
  {
    productName: "노트북 1",
    productDescript: "가볍고 슬림한 디자인",
    price: 1200000,
    imgName: "notebook1.jpeg",
  },
  {
    productName: "노트북 2",
    productDescript: "고성능 업무용 노트북",
    price: 1450000,
    imgName: "notebook2.jpeg",
  },
  {
    productName: "노트북 3",
    productDescript: "배터리 오래가는 휴대용",
    price: 990000,
    imgName: "notebook3.jpeg",
  },
    {
        productName: "노트북 4",
        productDescript: "게이밍에 최적화된 성능",
        price: 1990000,
        imgName: "notebook4.jpeg",
    },
    {
        productName: "노트북 5",
        productDescript: "디자인과 성능을 모두 갖춘",
        price: 1750000,
        imgName: "notebook5.jpeg",
    },
    {
        productName: "노트북 6",
        productDescript: "비즈니스용으로 적합한 모델",
        price: 1300000,
        imgName: "notebook6.jpeg",
    },
    {
        productName: "노트북 7",
        productDescript: "고해상도 디스플레이 탑재",
        price: 1600000,
        imgName: "notebook7.jpeg",
    },
    {
        productName: "노트북 8",
        productDescript: "최신 기술이 적용된 모델",
        price: 2100000,
        imgName: "notebook8.jpeg",
    },
];

function ProductCard({ productName, productDescript, price, imgName }) {
  const imgSrc = `/images/product/notebook/${imgName}`;
  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img src={imgSrc} alt={productName} className="product-img" />
      </div>
      <h2 className="product-name">{productName}</h2>
      <p className="product-desc">{productDescript}</p>
      <div className="product-price">₩{price.toLocaleString()}</div>
      <button className="product-buy-btn" onClick={() => alert(`${productName} 구매하기`)}>
        구매하기
      </button>
    </div>
  );
}

// 여러 제품을 한 번에 렌더링
function ProductCardList() {
  return (
    <div className="product-list">
      {products.map((p) => (
        <ProductCard
          key={p.imgName}
          productName={p.productName}
          productDescript={p.productDescript}
          price={p.price}
          imgName={p.imgName}
        />
      ))}
    </div>
  );
}

export default ProductCardList;
