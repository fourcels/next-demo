import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react';
import { Counter } from '../components/counter';
import styles from '../styles/Home.module.css'
import cx from 'classnames'

const data = { "id": 11, "created_at": "2020-09-16T11:51:14.261908+08:00", "updated_at": "2020-09-16T11:51:14.261908+08:00", "name": "测试商品1", "user_id": 1, "attrs": [{ "id": 6, "created_at": "2020-09-16T11:51:14.266122+08:00", "updated_at": "2020-09-16T11:51:14.266122+08:00", "name": "大小", "list": ["大", "中", "小"], "product_id": 11 }, { "id": 7, "created_at": "2020-09-16T11:51:14.266122+08:00", "updated_at": "2020-09-16T11:51:14.266122+08:00", "name": "颜色", "list": ["红", "黄", "蓝"], "product_id": 11 }, { "id": 8, "created_at": "2020-09-16T11:51:14.266122+08:00", "updated_at": "2020-09-16T11:51:14.266122+08:00", "name": "内存", "list": ["64G", "128G", "256G"], "product_id": 11 }], "skus": [{ "id": 22, "created_at": "2020-09-16T11:51:14.267669+08:00", "updated_at": "2020-09-16T11:51:14.267669+08:00", "name": "大,红,64G", "price": 100, "stock": 0, "product_id": 11 }, { "id": 23, "created_at": "2020-09-16T11:51:14.267669+08:00", "updated_at": "2020-09-16T11:51:14.267669+08:00", "name": "大,黄,128G", "price": 200, "stock": 10, "product_id": 11 }, { "id": 24, "created_at": "2020-09-16T11:51:14.267669+08:00", "updated_at": "2020-09-16T11:51:14.267669+08:00", "name": "大,蓝,256G", "price": 300, "stock": 10, "product_id": 11 }, { "id": 25, "created_at": "2020-09-16T11:51:14.267669+08:00", "updated_at": "2020-09-16T11:51:14.267669+08:00", "name": "小,红,64G", "price": 100, "stock": 0, "product_id": 11 }, { "id": 26, "created_at": "2020-09-16T11:51:14.267669+08:00", "updated_at": "2020-09-16T11:51:14.267669+08:00", "name": "小,黄,64G", "price": 100, "stock": 10, "product_id": 11 }, { "id": 27, "created_at": "2020-09-16T11:51:14.267669+08:00", "updated_at": "2020-09-16T11:51:14.267669+08:00", "name": "小,蓝,128G", "price": 100, "stock": 10, "product_id": 11 }] }


function combine(specs) {
  const result = [];
  for (let i = 0; i < Math.pow(2, specs.length); i++)
    result.push(specs.map((item, pos) => ((i >> pos) & 1) ? item : '').join(","));
  return result;
}

function initSku() {
  const result = []
  data.skus.forEach(item => {
    combine(item.name.split(',')).forEach(item2 => {
      if (result[item2]) {
        result[item2].stock += item.stock
        result[item2].prices.push(item.price)
      } else {
        result[item2] = {
          stock: item.stock,
          prices: [item.price],
          getPrice() {
            const min = Math.min(...this.prices)
            const max = Math.max(...this.prices)
            if (min === max) {
              return min
            }
            return `${min}-${max}`
          }
        }
      }
    })
  })
  return result
}

const result = initSku()

export default function Home() {

  // const [data, setData] = useState({});
  // useEffect(() => {
  //   fetch("http://localhost:1323/products/9")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setData(result);
  //       }
  //     )
  // }, [])


  const [specs, setSpecs] = useState(Array(data.attrs.length).fill(""))
  const sku = useMemo(() => result[specs.join(',')], [specs])

  function hasStock(item, index) {
    const specs2 = [...specs]
    specs2[index] = item
    const sku = result[specs2.join(',')]
    return sku && sku.stock > 0
  }


  function onItemClick(index, value) {
    setSpecs(preValue => {
      preValue[index] = specs[index] === value ? '' : value
      return [...preValue]
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div>
        <div>{data.name}</div>
        <div>
          {data.attrs.map((item, i1) => {
            return (
              <div style={{ marginTop: 10 }} key={i1}>
                {item.name}: {item.list.map((item2, i2) => {
                  return (
                    <button
                      disabled={!hasStock(item2, i1)}
                      className={cx({
                        [styles.active]: item2 === specs[i1]
                      })}
                      onClick={() => onItemClick(i1, item2)}
                      style={{ marginLeft: 5 }}
                      key={i2}>
                      {item2}
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
        {sku && (
          <div style={{ marginTop: 10 }}>
            库存: {sku.stock} 价格: {sku.getPrice()}
          </div>
        )}
      </div>
    </div>
  )
}
