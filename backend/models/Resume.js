const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true
    },
    mimeType: String,
    size: Number,
    filePath: String,
    parsedText: {
        type: String,
        required: true,
        maxlength: 50000
    },
    analysisResult: {
        score: { type: Number, min: 0, max: 100 },
        summary: String,
        top_skills: [String],
        missing_keywords: [String],
        critical_issues: [String],
        improvement_plan: [String],
        job_match_prediction: String
    },
    analysisType: {
        type: String,
        enum: ['pdf', 'text'],
        default: 'pdf'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        sparse: true // Allow null for anonymous users
    },
    metadata: {
        ipAddress: String,
        userAgent: String,
        country: String
    }
}, {
    timestamps: true // Auto-add createdAt and updatedAt
});

// Compound index for efficient queries
resumeSchema.index({ user: 1, createdAt: -1 });
resumeSchema.index({ 'analysisResult.score': 1 });

// Virtual for score category
resumeSchema.virtual('scoreCategory').get(function () {
    if (!this.analysisResult || !this.analysisResult.score) return 'unknown';
    if (this.analysisResult.score >= 80) return 'excellent';
    if (this.analysisResult.score >= 60) return 'good';
    if (this.analysisResult.score >= 40) return 'fair';
    return 'needs-improvement';
});

// Method to get similar resumes
resumeSchema.methods.findSimilar = function () {
    return this.model('Resume').find({
        'analysisResult.score': {
            $gte: (this.analysisResult?.score || 0) - 10,
            $lte: (this.analysisResult?.score || 0) + 10
        }
    }).limit(5);
};

// Static method for analytics
resumeSchema.statics.getAnalytics = function (days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.aggregate([
        {
            $match: { createdAt: { $gte: startDate } }
        },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                count: { $sum: 1 },
                avgScore: { $avg: '$analysisResult.score' }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
};

module.exports = mongoose.model('Resume', resumeSchema);
