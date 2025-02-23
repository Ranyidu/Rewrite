let obj = {};
let url = $request.url;
let isRequest = typeof $response == "undefined";
let responseBody = JSON.parse(!isRequest && $response.body || "{}");
const multiplierFactor = 20000;

const userDetails = {
    number: 12478,
    realName: '王志宇',
    nickName: 'GT861902',
    inviteLevel: '高级推广员',
    phone: '15988880000',
    idCard: '211282200005286039',
    headImage: 'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIBV5J3CkSibEcDwASEjQREYuPwESbPV0ZeUBQTqjq98I3QWTd0hL5TeIsjRTibgOpRvFV1qvuHzbcGtZcMDuBrzmQaq7icic2Gt9ZkEmicNBxVcoQ/132'
};

const apiPaths = {
    orderList: '/order/list-pages',
    orderDetail: '/order/get-detail',
    batchOrderList: '/batch-order/list-pages',
    batchOrderDetail: '/batch-order/get-detail',
    batchOrderListDetail: '/batch-order/list-detail-pages',
    memberInfo: '/member/get-base-info',
    withdrawalAccounts: '/withdraw/list-accounts',
    withdrawalInit: '/withdraw/init',
    alipayAccounts: '/profile/alipay-account/list-all',
    moneySplitResult: '/withdraw/get-money-split-result',
    drawRecordList: '/draw-record/list-pages',
    drawRecordDetail: '/draw-record/get-detail'
};

const maskString = (str, start = 0, end = 0) =>
    str.slice(0, start) + '*'.repeat(str.length - start - end) + str.slice(-end);

const multiplyAmount = (amount, factor) =>
    `${Math.floor(amount) * factor}.${(String(amount).split('.')[1] || '0')}`;

const formatTimestamp = (ts) =>
    typeof ts === 'string' &&!isNaN(Date.parse(ts))? ts : new Date(+ts).toISOString().replace('T',' ').slice(0, 19);

const processOrder = (order) => {
    if (order.collectionStatus === '2') {
        return {
           ...order,
            collectionStatus: '3',
            settlementStatus: 0,
            actualAmount: 0,
            settlementTime: '',
            remark: '非卡密原因失败，卡密未被我平台使用'
        };
    } else if (order.collectionStatus === '3') {
        return {
           ...order,
            collectionStatus: '2',
            settlementStatus: 1,
            exchangeAmount: order.parVal,
            actualAmount: order.parVal * order.discount / 100,
            settlementTime: order.arrivalTime? formatTimestamp(order.arrivalTime) : '',
            remark: ''
        };
    }
    return order;
};

const processBatchOrder = (batchOrder) => (batchOrder.operateStatus === '2')?
    {
       ...batchOrder,
        successCount: batchOrder.totalCount,
        failedCount: 0,
        parVal: batchOrder.totalFace,
        actualAmount: batchOrder.totalFace * batchOrder.discount / 100,
        settlementAmount: batchOrder.totalFace * batchOrder.discount / 100
    } :
    batchOrder;

const processList = (list, processor) => list.map(processor);

const updateMemberInfo = (body, details, factor) => {
    Object.assign(body.member, {
        number: details.number,
        realName: details.realName,
        idCard: details.idCard,
        phone: maskString(details.phone, 3, 4),
        headImg: details.headImage,
        nickName: details.nickName,
        inviteLevelName: details.inviteLevel,
        money: multiplyAmount(body.member.money, factor),
    });
};

const updateAccountInfo = (accounts, details) => {
    accounts.forEach(account => {
        Object.assign(account, {
            name: details.realName,
            account: maskString(details.phone, 3, 4),
            sourceAccount: details.phone,
        });
    });
};

const updateDrawRecords = (records, details, factor) => {
    records.forEach(record => {
        Object.assign(record, {
            name: details.realName,
            realName: details.realName,
            alipayAccount: maskString(details.phone, 3, 4),
            drawMoney: multiplyAmount(record.drawMoney, factor),
            drawActualMoney: multiplyAmount(record.drawMoney, factor),
        });
    });
};

switch (true) {
    case $request.url.includes(apiPaths.orderList):
        if (isRequest) {
            let regex = /collectionStatus=(\d+)/;
            let match = url.match(regex);
            if (match) {
                let currentValue = parseInt(match[1]);
                let newValue = currentValue === 2? 3 : currentValue === 3? 2 : currentValue;
                obj.url = url.replace(regex, `collectionStatus=${newValue}`);
            }
        } else {
            responseBody.list = processList(responseBody.list, processOrder);
        }
        break;
    case $request.url.includes(apiPaths.orderDetail):
        if (isRequest) break;
        responseBody = processOrder(responseBody);
        break;
    case $request.url.includes(apiPaths.batchOrderList):
        if (isRequest) break;
        responseBody.list = processList(responseBody.list, processBatchOrder);
        break;
    case $request.url.includes(apiPaths.batchOrderDetail):
        if (isRequest) break;
        responseBody = processBatchOrder(responseBody);
        break;
    case $request.url.includes(apiPaths.batchOrderListDetail):
        if (isRequest) break;
        responseBody.list = processList(responseBody.list, processOrder);
        break;
    case $request.url.includes(apiPaths.memberInfo):
        if (isRequest) break;
        updateMemberInfo(responseBody, userDetails, multiplierFactor);
        break;
    case $request.url.includes(apiPaths.withdrawalAccounts):
        if (isRequest) break;
        updateAccountInfo(responseBody.aliPayAccountList, userDetails);
        break;
    case $request.url.includes(apiPaths.withdrawalInit):
        if (isRequest) break;
        Object.assign(responseBody, {
            realName: userDetails.realName,
            money: String(multiplyAmount(responseBody.money, multiplierFactor)),
        });
        break;
    case $request.url.includes(apiPaths.alipayAccounts):
        if (isRequest) break;
        Object.assign(responseBody.member, {
            realName: userDetails.realName,
            idCard: maskString(userDetails.idCard, 4, 4),
        });
        updateAccountInfo(responseBody.aliPayAccountList, userDetails);
        break;
    case $request.url.includes(apiPaths.moneySplitResult):
        if (isRequest) break;
        responseBody.data = {
            needSplit: false,
            msg: '',
            moneys: [String(multiplyAmount(responseBody.data.money, 1 / multiplierFactor))]
        }
        break;
    case $request.url.includes(apiPaths.drawRecordList):
        if (isRequest) break;
        updateDrawRecords(responseBody.list, userDetails, multiplierFactor);
        break;
    case $request.url.includes(apiPaths.drawRecordDetail):
        if (isRequest) break;
        Object.assign(responseBody, {
            name: userDetails.realName,
            realName: userDetails.realName,
            alipayAccount: maskString(userDetails.phone, 3, 4),
            drawMoney: multiplyAmount(responseBody.drawMoney, multiplierFactor),
            drawActualMoney: multiplyAmount(responseBody.drawMoney, multiplierFactor),
        });
        break;
}

if (!isRequest) obj.body = JSON.stringify(responseBody)

$done(obj);
