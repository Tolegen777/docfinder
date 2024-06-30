import React from "react";
import styles from "./DoctorsNavs.module.scss";
import clsx from "clsx";
import {useStateContext} from "@/contexts";
import {Select} from "antd";

const options = [
  {
    label: 'Рейтинг по возрастанию',
    value: 'rating_asc'
  },
  {
    label: 'Рейтинг по убыванию',
    value: 'rating_desc'
  },
  {
    label: 'Цена по возрастанию',
    value: 'price_asc'
  },
  {
    label: 'Цена по убыванию',
    value: 'price_desc'
  }
];


const DoctorsNavs: React.FC = () => {

  const {state, dispatch} = useStateContext()

  const {query, ordering, forChild} = state

  const handleReset = () => {
     dispatch({
       type: 'SET_FOR_CHILD',
       payload: false
     })

    dispatch({
      type: 'SET_ORDERING',
      payload: 'rating_asc'
    })
  }

  return (
    <div>
      <section id={styles.doctorNavs}>
        <div className="container">
          <div className={styles.doctorNavs}>
            <div className={styles.doctorMainNavs}>
              {/*<button className={clsx({*/}
              {/*  [styles.discount]: true,*/}
              {/*  [styles.discount_active]: true*/}
              {/*})}>Скидки %</button>*/}
              {/*<button className={styles.change}>Cмена</button>*/}
              <button className={clsx({
                [styles.children]: true,
                [styles.children_active]: forChild
              })}
              onClick={() => {
                dispatch({
                  type: 'SET_FOR_CHILD',
                  payload: !forChild
                })
              }}
              >
                Детский
              </button>
              <h3
                  className={styles.reset}
                  onClick={handleReset}
              >
                Сбросить
              </h3>
            </div>
            <div className={styles.doctorMainSort}>
              {/*<select className={styles.popularity}>*/}
              {/*  <option>Сортировать: Популярность</option>*/}
              {/*</select>*/}
              <Select
                  className={styles.select}
                  showSearch
                  placeholder={`Сортировать по`}
                  options={options}
                  value={ordering}
                  onChange={(value: string) => {
                    dispatch({
                      type: 'SET_ORDERING',
                      payload: value
                    })
                  }}
              />
              {/*<select className={styles.price}>*/}
              {/*  <option>Сортировать: Стоимость</option>*/}
              {/*</select>*/}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorsNavs;
