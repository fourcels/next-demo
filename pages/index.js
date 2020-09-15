import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Counter } from '../components/counter';
import styles from '../styles/Home.module.css'
import cx from 'classnames'

const data = { "id": 9, "created_at": "2020-09-11T17:27:11.805082+08:00", "updated_at": "2020-09-11T17:27:11.805082+08:00", "deleted_at": null, "name": "测试商品1", "user_id": 1, "attrs": [{ "id": 2, "created_at": "2020-09-11T17:27:11.806425+08:00", "updated_at": "2020-09-11T17:27:11.806425+08:00", "deleted_at": null, "name": "大小", "items": ["大", "小"], "product_id": 9 }, { "id": 3, "created_at": "2020-09-11T17:27:11.806425+08:00", "updated_at": "2020-09-11T17:27:11.806425+08:00", "deleted_at": null, "name": "颜色", "items": ["红", "黄", "蓝"], "product_id": 9 }], "skus": [{ "id": 10, "created_at": "2020-09-11T17:27:11.808056+08:00", "updated_at": "2020-09-11T17:27:11.808056+08:00", "deleted_at": null, "name": "大,红", "price": 100, "stock": 10, "product_id": 9 }, { "id": 11, "created_at": "2020-09-11T17:27:11.808056+08:00", "updated_at": "2020-09-11T17:27:11.808056+08:00", "deleted_at": null, "name": "大,黄", "price": 200, "stock": 10, "product_id": 9 }, { "id": 12, "created_at": "2020-09-11T17:27:11.808056+08:00", "updated_at": "2020-09-11T17:27:11.808056+08:00", "deleted_at": null, "name": "大,蓝", "price": 300, "stock": 10, "product_id": 9 }, { "id": 13, "created_at": "2020-09-11T17:27:11.808056+08:00", "updated_at": "2020-09-11T17:27:11.808056+08:00", "deleted_at": null, "name": "小,红", "price": 100, "stock": 10, "product_id": 9 }, { "id": 14, "created_at": "2020-09-11T17:27:11.808056+08:00", "updated_at": "2020-09-11T17:27:11.808056+08:00", "deleted_at": null, "name": "小,黄", "price": 100, "stock": 10, "product_id": 9 }, { "id": 15, "created_at": "2020-09-11T17:27:11.808056+08:00", "updated_at": "2020-09-11T17:27:11.808056+08:00", "deleted_at": null, "name": "小,蓝", "price": 100, "stock": 10, "product_id": 9 }] }

let skus = data.skus.reduce(function (acc, cur, i) {
  acc[cur.name] = cur;
  return acc;
}, {});

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

  let selectedSku = {}
  let [selectedArr, setSelectedArr] = useState([])

  function onItemClick(index, value) {
    if (selectedArr[index] === value) {
      setSelectedArr(preValue => {
        delete preValue[index]
        return [...preValue]
      })
    } else {
      setSelectedArr((preValue) => {
        preValue[index] = value
        return [...preValue]
      })
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div>
        <div>{data.name}</div>
        <div>
          {data.attrs && data.attrs.map((item, i1) => {
            return (
              <div style={{ marginTop: 10 }} key={item.id}>
                {item.name}: {item.items.map((item2, i2) => {
                  return (
                    <button
                      className={cx({
                        [styles.active]: item2 === selectedArr[i1]
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
        <div style={{ marginTop: 10 }}>
          价格: {selectedSku.price} 库存: {selectedSku.stock}
        </div>
      </div>
    </div>
  )
}
