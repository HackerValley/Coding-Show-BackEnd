/**
 * Created by hss on 2016/11/22.
 */
'use strict';
module.exports = {
    respond,
};

function respond(status, msg, data, page_num = -1, page_size = 0, total_page = 0, total_record = 0) {
    if (page_num >= 0) {
        return {
            status: status,
            msg: msg,
            page_num: page_num,
            page_size: page_size,
            total_page: total_page,
            total_record: total_record,
            data: data ? data : [],
        };
    } else {
        return {
            status: status,
            msg: msg,
            data: data ? data : {}
        };
    }

}
