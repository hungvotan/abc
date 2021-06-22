import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import ContainerProductDetail from '~/components/layouts/ContainerProductDetail';
import ProductRepository from '~/repositories/ProductRepository';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import ContainerPage from '~/components/layouts/ContainerPage';
import HeaderProduct from '~/components/shared/headers/HeaderProduct';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import HeaderMarketPlace4 from "~/components/shared/headers/HeaderMarketPlace4";
import SearchmezRepository from "~/repositories/SearchmezRepository";
import Animals from "~/pages/lister/animals";
const ProductDefaultPage = () => {
    const router = useRouter();
    const { pid } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getProduct(pid) {
        setLoading(true);
        // const responseData = await ProductRepository.getProductsById(pid);
        const responseData = await SearchmezRepository.getListerById(pid);

        if (responseData) {
            setProduct(responseData[0]);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        getProduct(pid);
    }, [pid]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Listing',
            url: '/listing',
        },
        {
            text: product ? product.title : 'Loading...',
        },
    ];
    // Views
    let productView, headerView, related, custom;
    if (!loading) {
        if (product) {
            if(product.listing == 'animals') {
                productView = <Animals product={product} />;
                headerView = <HeaderProduct product={product} />;
                related = <RelatedProduct collectionSlug="animals" />;
                custom = <CustomerBought layout="fullwidth" collectionSlug="animals" />;
            } else {
                productView = <ProductDetailFullwidth product={product} />;
                headerView = <HeaderProduct product={product} />;
                custom = <CustomerBought layout="fullwidth" collectionSlug="deal-of-the-day" />;
                related = <RelatedProduct collectionSlug="shop-recommend-items" />;
            }

        } else {
            headerView = <HeaderMarketPlace4 />;
        }
    } else {
        productView = <SkeletonProductDetail />;
    }
    return (
        <ContainerProductDetail title={product ? product.title : 'Loading...'}>
            {headerView}
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <div className="ps-page--product">
                <div className="ps-container">
                    <div className="ps-page__container">
                        {productView}
                        {/*<div className="ps-page__left">{productView}</div>*/}
                        {/*<div className="ps-page__right">*/}
                        {/*    <ProductWidgets />*/}
                        {/*</div>*/}
                    </div>
                    {related}
                    {custom}

                </div>
            </div>
        </ContainerProductDetail>
    );
};

export default ProductDefaultPage;
