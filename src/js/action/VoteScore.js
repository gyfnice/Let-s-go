function VoteScore() {
    VoteScore.superclass.constructor.apply(this, arguments);
}

$jex.extendClass(VoteScore, XControl);
var $uservote = $("#uservote");
var bindEvent = function(me, actionid) {
    $uservote.delegate("a", "click", function(e) {
        if ($uservote.find(".lightvote").length !== 0) {
            e.preventDefault();
            return false;
        }
        var state = $(this).closest("a").data("score");
        me.postData(actionid, state);
        $(this).closest("a").addClass("lightvote");
        $(this).closest("a").find("span").text(++$(this).closest("a").text().match(/\d+/)[0]);
        e.preventDefault();
    });
}

VoteScore.prototype.update = function(data) {
    this.text('<a href="#" data-score="3" class="button"><i class="fa fa-heart"></i>Like');
    this.text('     <span class="like" style="padding-left: 10px;">', data.better, '</span>');
    this.text('</a>');
    this.text('<a href="#" data-score="2" class="button"><i class="fa fa-thumbs-up"></i> 顶');
    this.text('     <span class="up">', data.good, '</span>');
    this.text('</a>');
    this.text('<a href="#" data-score="1" class="button"><i class="fa fa-thumbs-down"></i> 踩');
    this.text('     <span class="down">', data.bad, '</span>');
    this.text('</a>');
    this.onInit(function() {
        data.listscore.forEach(function(elem) {
            if (elem.userid === data.curuserid) {
                data.curchoice = elem.scoreflag
            }
        })
        $('a[data-score=' + data.curchoice + ']').addClass("lightvote");
        bindEvent(this, data.actionid);
    });
}
VoteScore.prototype.postData = function(actionid, state) {
    var me = this;

    $.ajax({
        type: "POST",
        url: eDomain.getURL("actiontype/voteup"),
        dataType: "json",
        data: {
            actId: actionid,
            state: state
        },
        success: function(data) {
            if (!data.ret) {
                alert(data.errmsg);
                return false;
            }
            // $(me).trigger("reloadvote",state);
        },
        error: function(data) {

        }
    });
}
module.exports = VoteScore;