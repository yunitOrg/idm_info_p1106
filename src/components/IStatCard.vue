<template>
    <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id" class="root" :class="className.root">
        <div class="wrap">
            <div
                v-for="(item, itemIndex) in dataSource"
                :key="itemIndex"
                @click="handleClick(item, itemIndex)"
                :class="`item ${className.card}`"
                :style="getStyle(item, itemIndex)"
            >
                <img v-if="getIconUrl(item, itemIndex)" :src="getIconUrl(item, itemIndex)" class="icon" />
                <div class="info">
                    <div class="name">{{ getName(item, itemIndex) }}</div>
                    <div class="count">{{ getCount(item, itemIndex) }}</div>
                </div>
            </div>
        </div>
        <a-tooltip v-if="propData.settingEnabled" title="设置">
            <svg v-if="propData.settingIcon && propData.settingIcon.length > 0" @click="handleOpen" class="idm_button_svg_icon setting-btn" aria-hidden="true">
                <use :xlink:href="`#${propData.settingIcon[0]}`"></use>
            </svg>
        </a-tooltip>
        <a-drawer :visible="setting.visible" @close="handleClose" :title="propData.settingTitle">
            <div class="list-wrap">
                <div v-for="(item, itemIndex) in setting.dataSource.checkedList" :key="itemIndex">
                    <div class="item">
                        <img :src="getSettingIconUrl(item, itemIndex)" />
                        <div class="title">
                            {{ getSettingName(item, itemIndex) }}
                        </div>
                        <svg @click="handleDelete(item)" class="idm_button_svg_icon action-btn" aria-hidden="true">
                            <use :xlink:href="`#idm-icon-shanchu`"></use>
                        </svg>
                    </div>
                </div>
                <hr />
                <div v-for="(item, itemIndex) in setting.dataSource.dataList" :key="itemIndex">
                    <div class="item">
                        <img :src="getSettingIconUrl(item, itemIndex)" class="icon" />
                        <div class="title">
                            {{ getSettingName(item, itemIndex) }}
                        </div>
                        <svg @click="handleAdd(item)" class="idm_button_svg_icon action-btn" aria-hidden="true">
                            <use :xlink:href="`#idm-icon-jiahao`"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </a-drawer>
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
            root() {
                return this.propData
            },
            card() {
                return {
                    width: this.propData.cardWidth,
                    height: this.propData.cardHeight,
                    ulbox: this.propData.cardUlbox,
                    bgColor: this.propData.cardBgColor,
                    boxShadow: this.propData.cardBoxShadow,
                    boxborder: this.propData.cardBoxborder,
                    layout: this.propData.cardLayout
                }
            }
        })
    ],
    data() {
        return {
            dataSource: [],
            setting: {
                visible: false,
                dataSource: {}
            }
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            this.loadCardData()
        },
        loadCardData(params = {}) {
            if (availableArray(this.propData.customParams)) {
                params = window.IDM.invokeCustomFunctions.call(this, this.propData.customParams, {}).reduce((carry, current) => Object.assign(carry, current), params)
            }
            return dataUtil
                .fetchData(
                    {
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
                    },
                    {
                        params
                    }
                )
                .then((data) => {
                    this.dataSource = data
                    return data
                })
        },
        loadSettingData(params = {}) {
            if (availableArray(this.propData.settingCustomParams)) {
                params = window.IDM.invokeCustomFunctions.call(this, this.propData.settingCustomParams, {}).reduce((carry, current) => Object.assign(carry, current), params)
            }
            return dataUtil
                .fetchData(
                    {
                        dataSourceType: this.propData.settingDataSourceType,
                        dataSource: this.propData.settingDataSource,
                        customInterface: {
                            url: this.propData.settingCustomInterfaceUrl,
                            requestParamFun: this.propData.settingRequestParamFun,
                            requestContentType: this.propData.settingRequestContentType,
                            requestType: this.propData.settingRequestType,
                            responseDataFun: this.propData.settingResponseDataFun,
                            requestErrorFun: this.propData.settingRequestErrorFun
                        },
                        pageCommonInterface: {
                            dataset: this.contextDataset,
                            dataName: this.propData.settingDataName,
                            dataFiled: this.propData.settingDataFiled,
                            dataFunc: this.propData.settingDataFunc
                        },
                        customFunction: this.propData.settingCustomFunction
                    },
                    {
                        params
                    }
                )
                .then((data) => {
                    this.setting.dataSource = data
                    return data
                })
        },
        getIconUrl(record, index) {
            if (availableArray(this.propData.iconFunc)) {
                return window.IDM.invokeCustomFunctions(this.propData.iconFunc, {
                    record,
                    index
                }).join('')
            }
            return record[this.propData.iconField]
        },
        getName(record, index) {
            if (availableArray(this.propData.nameFunc)) {
                return window.IDM.invokeCustomFunctions(this.propData.nameFunc, {
                    record,
                    index
                }).join('')
            }
            return record[this.propData.nameField]
        },
        getCount(record, index) {
            if (availableArray(this.propData.countFunc)) {
                return window.IDM.invokeCustomFunctions(this.propData.countFunc, {
                    record,
                    index
                }).join('')
            }
            return record[this.propData.countField]
        },
        handleClick(record, index) {
            if (availableArray(this.propData.handleClickFun)) {
                window.IDM.invokeCustomFunctions(this.propData.handleClickFun, {
                    record,
                    index
                })
            }
        },
        getStyle(record, index) {
            if (availableArray(this.propData.styleFunc)) {
                return window.IDM.invokeCustomFunctions(this.propData.styleFunc, {
                    record,
                    index
                }).reduce((carry, current) => {
                    return Object.assign(carry, current)
                }, {})
            }
        },
        handleOpen() {
            this.setting.visible = true
            this.loadSettingData()
        },
        handleClose() {
            this.setting.visible = false
        },
        getSettingIconUrl(record, index) {
            if (availableArray(this.propData.settingIconFunc)) {
                return window.IDM.invokeCustomFunctions(this.propData.settingIconFunc, {
                    record,
                    index
                }).join('')
            }
            return record[this.propData.settingIconField]
        },
        getSettingName(record, index) {
            if (availableArray(this.propData.settingNameFunc)) {
                return window.IDM.invokeCustomFunctions(this.propData.settingNameFunc, {
                    record,
                    index
                }).join('')
            }
            return record[this.propData.settingNameField]
        },
        handleDelete(record) {
            if (availableArray(this.propData.settingDeleteFunc)) {
                window.IDM.invokeCustomFunctions.call(this, this.propData.settingDeleteFunc, {
                    record
                })
            }
            this.loadSettingData()
        },
        handleAdd(record) {
            if (availableArray(this.propData.settingAddFunc)) {
                window.IDM.invokeCustomFunctions.call(this, this.propData.settingAddFunc, {
                    record
                })
            }
            this.loadSettingData()
        },
        receiveBroadcastMessage(object) {
            switch (object.type) {
                case 'linkageReload':
                    this.initData()
                    break
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.root {
    position: relative;
}
.setting-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 16px;
    height: 16px;
    cursor: pointer;
    fill: rgba(153, 153, 153, 1);
}
.wrap {
    display: flex;
    gap: 20px;
    height: 100%;
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
.list-wrap {
    hr {
        border-top: 1px solid #ccc;
    }
    .item {
        display: flex;
        align-items: center;
        padding: 10px;
        gap: 10px;
        .icon {
            width: 36px;
        }
        .title {
            flex: 1;
            width: 0;
        }
        .action-btn {
            width: 16px;
            height: 16px;
            cursor: pointer;
            fill: rgba(153, 153, 153, 1);
        }
    }
}
</style>
