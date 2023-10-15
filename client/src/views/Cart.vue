<template>
    <div class="row mx-md-5 mx-1 my-2">
        <div><h1 class="text-center">Giỏ Hàng</h1></div>

        <div class="col-12 col-md-8 table-responsive-sm">
            <table class="giohang-hienthi my-3">
                <tr>
                    <th class="col" colspan="3">Sản phẩm</th>
                    <th class="col">giá</th>
                    <th class="col">số lượng</th>
                    <th class="col">tạm tính</th>
                </tr>
                <tbody>
                    <tr>
                        <td>
                            <a
                                href="pages/main/xulygiohang.php?id_sp_canxoa=<?php echo $row['id_sanpham']; ?>"
                                class="text-dark text-decoration-none"
                                ><i class="fa-sharp fa-solid fa-xmark delete-purchase-icon"></i> Xóa</a
                            >
                        </td>
                        <td>
                            <img
                                class="m-2"
                                width="130"
                                height="100"
                                src="admincp/modules/quanlysp/uploads/<?php echo $row['hinhanhsp'] ?>"
                                alt=""
                            />
                        </td>
                        <td style="width: 400px"></td>
                        <td><span></span></td>
                        <td>
                            <form
                                id="form-id"
                                action="pages/main/xulygiohang.php"
                                method="POST"
                                enctype="application/x-www-form-urlencoded"
                            >
                                <div class="add-minus d-flex mx-1 minus-and-plus">
                                    <button class="minus-sp nosubmit bg-light border border-light-subtle" id="minus-sp">
                                        -
                                    </button>
                                    <input
                                        class="text-center bg-light border border-light-subtle"
                                        data-id="<?php echo $row['id_sanpham'] ?>"
                                        type="text"
                                        name="<?php echo $row['id_sanpham'] ?>"
                                        id="amount_<?php echo $row['id_sanpham'] ?>"
                                        size="2"
                                        value="<?php echo $row['soluong'] ?>"
                                        style="outline: none"
                                    />
                                    <button class="plus-sp nosubmit bg-light border border-light-subtle" id="plus-sp">
                                        +
                                    </button>
                                </div>
                            </form>
                        </td>
                        <td><span style="white-space: nowrap"></span></td>
                    </tr>
                    <tr>
                        <td colspan="6">
                            <button id="submit-btn" type="submit" name="cap-nhat-gio-hang" class="btn btn-primary my-1">
                                cập nhật giỏ hàng
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col mt-3">
            <table class="giohang-conggiohang mb-3">
                <tr>
                    <th colspan="2" class="width-100 text-center">CỘNG GIỎ HÀNG</th>
                </tr>
            </table>
            <table class="giohang-conggiohang">
                <tbody>
                    <tr>
                        <td>Tạm tính</td>
                        <td class="text-right"><span></span></td>
                    </tr>
                    <tr>
                        <td>Tổng</td>
                        <td class="text-right"><span name="tongtien"></span></td>
                    </tr>
                </tbody>
            </table>
            <div></div>

            <a class="btn btn-danger w-100 mt-2" role="button" href="index.php?quanly=thanhtoan" type="submit"
                >Thanh toán</a
            >
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.giohang-hienthi,
.giohang-hienthi td,
.giohang-hienthi th {
    border: 1px solid #000;
    text-align: center;
}
.giohang-hienthi th {
    text-transform: uppercase;
}
.giohang-hienthi span {
    padding: 0 4px;
    white-space: nowrap;
}
.giohang-conggiohang {
    width: 100%;
}
.giohang-conggiohang,
.giohang-conggiohang td,
.giohang-conggiohang th {
    border: 1px solid #000;
}
.delete-purchase-icon {
    border-radius: 50%;
    border: 1px solid #000;
    padding: 4px;
    background-color: #fff;
}
.delete-purchase-icon:hover {
    background-color: pink;
}
</style>
