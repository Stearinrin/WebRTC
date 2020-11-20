function loadImages(img) {
    try {
        // 背景イメージ格納
        img["keio"] = new Image();
        img["keio"].src = "image/keio.png";
        img["chofu"] = new Image();
        img["chofu"].src = "image/chofu.png";
        img["meidaimae"] = new Image();
        img["meidaimae"].src = "image/meidaimae.png"
        img["kitano"] = new Image();
        img["kitano"].src = "image/kitano.png";
        img["sasazuka"] = new Image();
        img["sasazuka"].src = "image/sasazuka.png";

        // 部品イメージ格納
        img["chofu_b1_off"] = new Image();
        img["chofu_b1_off"].src = "image/chofu_b1_off.png";
        img["chofu_b1_on"] = new Image();
        img["chofu_b1_on"].src = "image/chofu_b1_on.png";
        img["chofu_b2_off"] = new Image();
        img["chofu_b2_off"].src = "image/chofu_b2_off.png";
        img["chofu_b2_on"] = new Image();
        img["chofu_b2_on"].src = "image/chofu_b2_on.png";
        img["chofu_b3_off"] = new Image();
        img["chofu_b3_off"].src = "image/chofu_b3_off.png";
        img["chofu_b3_on"] = new Image();
        img["chofu_b3_on"].src = "image/chofu_b3_on.png";
        img["chofu_s1_off"] = new Image();
        img["chofu_s1_off"].src = "image/chofu_s1_off.png";
        img["chofu_s1_on"] = new Image();
        img["chofu_s1_on"].src = "image/chofu_s1_on.png";
        img["chofu_s2_off"] = new Image();
        img["chofu_s2_off"].src = "image/chofu_s2_off.png";
        img["chofu_s2_on"] = new Image();
        img["chofu_s2_on"].src = "image/chofu_s2_on.png";
        img["chofu_s3_off"] = new Image();
        img["chofu_s3_off"].src = "image/chofu_s3_off.png";
        img["chofu_s3_on"] = new Image();
        img["chofu_s3_on"].src = "image/chofu_s3_on.png";
        img["chofu_s4_off"] = new Image();
        img["chofu_s4_off"].src = "image/chofu_s4_off.png";
        img["chofu_s4_on"] = new Image();
        img["chofu_s4_on"].src = "image/chofu_s4_on.png";

        img["meidaimae_s1_off"] = new Image();
        img["meidaimae_s1_off"].src = "image/meidaimae_s1_off.png";
        img["meidaimae_s1_on"] = new Image();
        img["meidaimae_s1_on"].src = "image/meidaimae_s1_on.png";
        img["meidaimae_s2_off"] = new Image();
        img["meidaimae_s2_off"].src = "image/meidaimae_s2_off.png";
        img["meidaimae_s2_on"] = new Image();
        img["meidaimae_s2_on"].src = "image/meidaimae_s2_on.png";

        img["kitano_b1_off"] = new Image();
        img["kitano_b1_off"].src = "image/kitano_b1_off.png";
        img["kitano_b1_on"] = new Image();
        img["kitano_b1_on"].src = "image/kitano_b1_on.png";
        img["kitano_s2_off"] = new Image();
        img["kitano_s2_off"].src = "image/kitano_s2_off.png";
        img["kitano_s2_on"] = new Image();
        img["kitano_s2_on"].src = "image/kitano_s2_on.png";
        img["kitano_s3_off"] = new Image();
        img["kitano_s3_off"].src = "image/kitano_s3_off.png";
        img["kitano_s3_off"] = new Image();
        img["kitano_s3_off"].src = "image/kitano_s3_off.png";

        img["sasazuka_b1_off"] = new Image();
        img["sasazuka_b1_off"].src = "image/sasazuka_b1_off.png";
        img["sasazuka_b1_on"] = new Image();
        img["sasazuka_b1_on"].src = "image/sasazuka_b1_on.png";
        img["sasazuka_s1_off"] = new Image();
        img["sasazuka_s1_off"].src = "image/sasazuka_s1_off.png";
        img["sasazuka_s1_on"] = new Image();
        img["sasazuka_s1_on"].src = "image/sasazuka_s1_on.png";
        img["sasazuka_s2_off"] = new Image();
        img["sasazuka_s2_off"].src = "image/sasazuka_s2_off.png";
        img["sasazuka_s2_off"] = new Image();
        img["sasazuka_s2_off"].src = "image/sasazuka_s2_off.png";
        img["sasazuka_s4_off"] = new Image();
        img["sasazuka_s4_off"].src = "image/sasazuka_s4_off.png";
        img["sasazuka_s4_off"] = new Image();
        img["sasazuka_s4_off"].src = "image/sasazuka_s4_off.png";
    } 
    catch (error) {
        console.error(error);
        alert("イメージの読み込みに失敗しました。")
    }
}