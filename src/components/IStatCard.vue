<template>
    <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id">
        <div :class="`wrap ${className.wrap}`">
            <div v-for="(item, itemIndex) in dataSource" :key="itemIndex" @click="handleClick(item)" :class="`item ${className.item}`" :style="getStyle(item)">
                <img v-if="getIconUrl(item)" :src="getIconUrl(item)" class="icon" />
                <div class="info">
                    <div class="name">{{ getName(item) }}</div>
                    <div class="count">{{ getCount(item) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { availableArray, dataUtil } from '../utils'
import { bindProp, bindStyle } from '../mixins'
export default {
    mixins: [
        bindProp({
            iconField: 'icon',
            nameField: 'name',
            countField: 'count'
        }),
        bindStyle({
            wrap() {
                return this.propData
            },
            card() {
                return {
                    width: this.propData.cardWidth,
                    height: this.propData.cardHeight,
                    ulbox: this.propData.cardUlbox,
                    bgColor: this.propData.cardBgColor,
                    boxShadow: this.propData.cardBoxShadow,
                    boxborder: this.propData.cardBoxborder
                }
            }
        })
    ],
    data() {
        return {
            dataSource: []
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            dataUtil
                .fetchData({
                    dataSourceType: this.propData.dataSourceType,
                    dataSource: this.propData.dataSource,
                    customInterface: {
                        url: this.propData.customInterfaceUrl,
                        requestParamFun: this.propData.requestParamFun,
                        requestContentType: this.propData.requestContentType,
                        requestType: this.propData.requestType,
                        responseDataFun: this.propData.responseDataFun,
                        requestErrorFun: this.propData.requestErrorFun
                    },
                    pageCommonInterface: {
                        dataset: this.contextDataset,
                        dataName: this.propData.dataName,
                        dataFiled: this.propData.dataFiled,
                        dataFunc: this.propData.dataFunc
                    },
                    customFunction: this.propData.customFunction
                })
                .then((data) => {
                    debugger
                    this.dataSource = data
                })
        },
        getIconUrl(record) {
            if (availableArray(this.propData.iconFunc)) {
                return window.IDM.invokeCustomFunctions(this.propData.iconFunc, {
                    record
                }).join('')
            }
            return record[this.propData.iconField]
        },
        getName(record) {
            if (availableArray(this.propData.nameFunc)) {
                return window.IDM.invokeCustomFunctions(this.propData.nameFunc, {
                    record
                }).join('')
            }
            return record[this.propData.nameField]
        },
        getCount(record) {
            if (availableArray(this.propData.countFunc)) {
                return window.IDM.invokeCustomFunctions(this.propData.countFunc, {
                    record
                }).join('')
            }
            return record[this.propData.countField]
        },
        handleClick(record) {
            if (availableArray(this.propData.handleClickFun)) {
                window.IDM.invokeCustomFunctions(this.propData.handleClickFun, {
                    record
                })
            }
        },
        getStyle(record) {
            if (availableArray(this.propData.styleFunc)) {
                return window.IDM.invokeCustomFunctions(this.propData.styleFunc, {
                    record
                }).reduce((carry, current) => {
                    return Object.assign(carry, current)
                }, {})
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.wrap {
    position: relative;
    display: flex;
    gap: 20px;
    padding: 30px 20px;
    > .item {
        flex: 1;
        width: 0;
        border-radius: 5px;
        display: flex;
        align-items: center;
        border-color: var(--border-color, rgb(205, 230, 252));
        background-color: var(--bg-color, rgb(244, 248, 252));
        padding: 10px 20px;
        gap: 20px;
        > .icon {
            width: var(--icon-size, 54px);
            height: var(--icon-size, 54px);
        }
        > .info {
            flex: 1;
            width: 0;
            .name {
                color: var(--name-color, #333333);
                font-size: var(--name-size, 16px);
            }
            .count {
                color: var(--count-color, rgb(16, 152, 234));
                font-size: var(--count-size, 32px);
            }
        }
    }
}
</style>
