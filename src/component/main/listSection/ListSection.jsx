import React from 'react';
import styled from './ListSection.module.css';
import Pagination from '../pagination/Pagination';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getProductListApi} from '../../../api/adminService';
import {ellepsis} from '../../../utils/ellipsisFunction';

const ListSection = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);
  const [limit, setLimit] = React.useState(10);

  const {status, data, error, isFetching, isPreviousData} = useQuery({
    queryKey: ['products', page, limit],
    queryFn: () => getProductListApi(page, limit),
    keepPreviousData: true,
    staleTime: 5000,
  });

  React.useEffect(() => {
    if (page * limit < data?.total - limit) setHasMore(true);
    else setHasMore(false);

    if (!isPreviousData && hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['products', page + 1, limit],
        queryFn: () => getProductListApi(page + 1),
        keepPreviousData: true,
        // staleTime: 5000,
      });
    }
  }, [data, isPreviousData, page, queryClient, hasMore, limit]);

  return (
    <>
      <div className={styled.search_result}>
        검색된 데이터 : <p className={styled.highlight}>{data?.total}</p> 건
      </div>
      <div className={`${styled.wrapper}`}>
        <div className={`${styled.item_wrapper}`}>
          <div className={`${styled.item} ${styled.item_title}`}>
            <p className={`${styled.text}`}>상품번호</p>
            <p className={`${styled.text}`}>상품명</p>
            <p className={`${styled.text}`}>브랜드</p>
            <p className={`${styled.text}`}>상품내용</p>
            <p className={`${styled.text}`}>가격</p>
            <p className={`${styled.text}`}>평점</p>
            <p className={`${styled.text}`}>재고</p>
          </div>
          <div>
            {status === 'loading' && (
              <div className={`${styled.wrapper}`}>Loading...</div>
            )}
            {data?.products.map((product) => (
              <p key={product.id}>
                <div className={`${styled.item}`}>
                  <p className={`${styled.text}`}>{product.id}</p>
                  <p className={`${styled.text}`}>{product.title}</p>
                  <p className={`${styled.text}`}>{product.brand}</p>
                  <p className={`${styled.text} `}>
                    {ellepsis(product.description)}
                  </p>
                  <p className={`${styled.text}`}>{`$${product.price}`}</p>
                  <p className={`${styled.text}`}>{product.rating}</p>
                  <p className={`${styled.text}`}>{product.stock}</p>
                </div>
              </p>
            ))}
          </div>
        </div>
        <div>
          <Pagination
            page={page}
            setPage={setPage}
            isPreviousData={isPreviousData}
            hasMore={hasMore}
            total={data?.total}
            limit={limit}
          />
        </div>
      </div>
    </>
  );
};

export default ListSection;
