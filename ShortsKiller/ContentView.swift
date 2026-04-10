//
//  ContentView.swift
//  ShortsKiller
//
//  Created by Jacob Kelly on 3/12/26.
//

import SwiftUI
import UIKit

struct ContentView: View {
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    headerSection
                    descriptionCard
                    enableStepsCard
                    settingsButton
                    privacyPolicyLink
                    footerNote
                }
                .padding(20)
            }
            .navigationBarTitleDisplayMode(.inline)
        }
    }

    private var headerSection: some View {
        VStack(spacing: 16) {
            Image("AppLogo")
                .resizable()
                .scaledToFit()
                .frame(width: 110, height: 110)
                .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
                .shadow(radius: 6, y: 2)

            VStack(spacing: 8) {
                Text("ShortsKiller")
                    .font(.system(size: 32, weight: .bold, design: .rounded))
                    .multilineTextAlignment(.center)

                Text("Less Shorts. More Control.")
                    .font(.headline)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 8)
    }

    private var descriptionCard: some View {
        InfoCard {
            VStack(alignment: .leading, spacing: 12) {
                Label("What it does", systemImage: "sparkles")
                    .font(.headline)

                Text("ShortsKiller hides YouTube Shorts content and redirects Shorts pages to the YouTube homepage while browsing in Safari.")
                    .font(.body)
                    .foregroundStyle(.primary)
            }
        }
    }

    private var enableStepsCard: some View {
        InfoCard {
            VStack(alignment: .leading, spacing: 14) {
                Label("How to enable", systemImage: "checklist")
                    .font(.headline)

                VStack(alignment: .leading, spacing: 12) {
                    StepRow(number: 1, text: "Open the Settings app")
                    StepRow(number: 2, text: "Tap Safari")
                    StepRow(number: 3, text: "Tap Extensions")
                    StepRow(number: 4, text: "Turn on ShortsKiller")
                    StepRow(number: 5, text: "Allow it on YouTube")
                }
            }
        }
    }

    private var settingsButton: some View {
        Button(action: openSettings) {
            HStack {
                Image(systemName: "gearshape.fill")
                Text("Open Settings")
                    .fontWeight(.semibold)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 14)
        }
        .buttonStyle(.borderedProminent)
        .controlSize(.large)
    }

    private var privacyPolicyLink: some View {
        Link(destination: URL(string: "https://jskelly2021.github.io/ShortsKiller/privacy.html")!) {
            HStack {
                Image(systemName: "lock.shield")
                Text("Privacy Policy")
                    .fontWeight(.semibold)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 12)
        }
        .buttonStyle(.bordered)
        .controlSize(.large)
    }

    private var footerNote: some View {
        Text("Safari extensions must be enabled manually in Settings. Once enabled, ShortsKiller will work automatically on YouTube in Safari.")
            .font(.footnote)
            .foregroundStyle(.secondary)
            .multilineTextAlignment(.center)
            .padding(.horizontal, 8)
    }

    private func openSettings() {
        guard let url = URL(string: UIApplication.openSettingsURLString),
              UIApplication.shared.canOpenURL(url) else {
            return
        }

        UIApplication.shared.open(url)
    }
}

private struct InfoCard<Content: View>: View {
    @ViewBuilder let content: Content

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            content
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(18)
        .background(
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .fill(.thinMaterial)
        )
    }
}

private struct StepRow: View {
    let number: Int
    let text: String

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            ZStack {
                Circle()
                    .fill(Color.accentColor.opacity(0.15))
                    .frame(width: 28, height: 28)

                Text("\(number)")
                    .font(.subheadline.weight(.bold))
                    .foregroundStyle(Color.accentColor)
            }

            Text(text)
                .font(.body)
                .foregroundStyle(.primary)

            Spacer(minLength: 0)
        }
    }
}
